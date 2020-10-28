import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './style/canvas.css';

const shapeCosts = {'circle': 20, 'square': 20, 'triangle': 20, 'rectangle': 20};

const EditProfile = () => {
    
  const history = useHistory();
  const [selected, changeSelected] = useState(false);
  const [shapes, updateShapes] = useState([]);
  const [shapeSize, setSize] = useState(50);
  const [rotation, setRotation] = useState(0);
  const [needRerender, setRerender] = useState(false);
  const [level, setLevel] = useState();
  const [points, setPoints] = useState();
  const canvas = useRef();

  const goBack = () => {history.push('/profile');}

  //When the page first loads, get the user's level
  //So taht we can scale the points
  useEffect(() => {
    fetch('/profile/Jesse Klein')
      .then(response => response.json())
      .then(data => {
        setLevel(data.level);
        setPoints(data.level * 60 + 100);
      })
  
  }, []);


  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      const keyPressed = event.key;
      if (keyPressed === 'a' || keyPressed === 'd') {
        handleRotate(keyPressed);
      } else if (keyPressed === 'w' || keyPressed === 's') {
        handleResize(keyPressed);
      }
    });
  }, []);

  const handleResize = (key) => {
    if (key === 'w') {
      setSize((prevSize) => (prevSize + 10) > 100 ? 100 : (prevSize + 5));
    } else if (key === 's') {
      setSize((prevSize) => (prevSize - 10) < 10 ? 10 : (prevSize - 5));
    }
  }

  const handleRotate = (key) => {
    if (key === 'a') {
      setRotation((prevRotation) => ((prevRotation - 90) < 0 ? 270 : (prevRotation - 90)));
    } else if (key === 'd') {
      setRotation((prevRotation) => ((prevRotation + 90) >= 360 ? 0 : (prevRotation + 90)));
    }
  }


  const selectShape = (shapeName) => {
    console.log('selecting:', shapeName)

    const shapeNames = ['circle', 'triangle', 'square', 'rectangle'];
    for (let i = 0; i < shapeNames.length; i++) {
      document.getElementById(shapeNames[i]).classList.remove('selected');
    }
    document.getElementById(shapeName).classList.add('selected');
    changeSelected(shapeName);
  }

  const selectCircle = () => {selectShape('circle')}

  const selectTriangle = () => {selectShape('triangle')}

  const selectSquare = () => {selectShape('square')}

  const selectRectangle = () => {selectShape('rectangle')}

  const handleCanvas = (evt) => {
    var rect = canvas.current.getBoundingClientRect();
    renderCanvas(evt.clientX - rect.left, evt.clientY - rect.top);
  }

  const drawRectangle = (x, y, size, rotation) => {
    var ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    if (rotation === 0) {
      ctx.rect(x, y, size, size * 2);
    } else if (rotation === 90) {
      ctx.rect(x, y, -size * 2, size);
    } else if (rotation === 180) {
      ctx.rect(x, y, size, -size * 2);
    } else {
      ctx.rect(x, y, size * 2, -size);
    }
    ctx.stroke();
  }

  const drawCircle = (x, y, size) => {
    var ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  const drawTriangle = (x, y, size, rotation) => {
    var ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (rotation === 0) {
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x + size, y - size);
    } else if (rotation === 90) {
      ctx.lineTo(x + size, y - size);
      ctx.lineTo(x + 2 * size, y);
    } else if (rotation === 180) {
      ctx.lineTo(x - size, y + size);
      ctx.lineTo(x - size, y - size);
    } else {
      ctx.lineTo(x + size, y + size);
      ctx.lineTo(x + 2 * size, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  const drawSquare = (x, y, size) => {
    var ctx = canvas.current.getContext("2d");
    ctx.beginPath();
    ctx.rect(x, y, size * 2, size * 2);
    ctx.stroke();
  }

  const resetShapes = () => {
    if (shapes.length === 0) {
      setErrorMessage("Nothing to clear!");
      return;
    }
    for (let i = 0; i < shapes.length; i++) {
      setPoints((prev) => prev + shapeCosts[shapes[i].type]);
    }
    updateShapes([]);
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
  }

  const renderSavedShapes = (x, y) => {
    
    const ctx = canvas.current.getContext('2d');
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (shape.type === 'circle') {
        drawCircle(shape.x, shape.y, shape.size);
      } else if (shape.type === 'rectangle') {
        drawRectangle(shape.x, shape.y, shape.size, shape.rotation);
      } else if (shape.type === 'square') {
        drawSquare(shape.x, shape.y, shape.size);
      } else if (shape.type === 'triangle') {
        drawTriangle(shape.x, shape.y, shape.size, shape.rotation);
      } 
    }
  }

  const renderCanvas = (x, y) => {

    renderSavedShapes(x, y);

    if (selected === 'circle') {
      drawCircle(x, y, shapeSize);
    } else if (selected === 'rectangle') {
      drawRectangle(x, y, shapeSize, rotation);
    } else if (selected === 'square') {
      drawSquare(x, y, shapeSize);
    } else if (selected === 'triangle') {
      drawTriangle(x, y, shapeSize, rotation);
    } else {
      return;
    }

  }

  const handleCanvasClick = (evt) => {
    if (selected === false) return;

    var rect = canvas.current.getBoundingClientRect();
    const x = evt.clientX - rect.left;
    const y = evt.clientY - rect.top;
    if (points - shapeCosts[selected] < 0) {
      setErrorMessage("Not enough points to buy that")
      return;
    }
    setPoints((prev) => prev - shapeCosts[selected]);

    updateShapes([...shapes, {type: selected, x, y, size: shapeSize, rotation}]);
    setErrorMessage("");
  }

  const handleCanvasLeave = (evt) => {
    var rect = canvas.current.getBoundingClientRect();
    renderSavedShapes(evt.clientX - rect.left, evt.clientY - rect.top);
  }

  const saveAvatar = () => {

    if (shapes.length === 0) {
      setErrorMessage("Nothing to save!");
      return;
    }

    const dataURL = canvas.current.toDataURL();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({imgURL: dataURL})
    };
    
    fetch('/profile/updateimg', requestOptions)
      .catch(err => console.log(err))

  }

  const clearLastShape = () => {
    if (shapes.length === 0) {
      setErrorMessage("No shapes to clear!");
      return;
    }
    const shape = shapes.slice(0, 1)[0];
    setPoints((prev) => prev + shapeCosts[shape.type]);
    updateShapes(shapes.slice(1));
    setRerender(true);
  }

  const handleRerender = () => {
    if (needRerender) {
      renderCanvas();
    }
  }

  const setErrorMessage = (message) => {
    const error = document.getElementById("error-message");
    error.innerText = message;
  }

  return (
    <React.Fragment>
      <div className='back-button' onClick={goBack}>⟵   Back</div>
      <div id="page-content">
        <h2>Level: {level} Points: {points} </h2>
        <div id="edit-profile-page">
          <div id='shapes-container'>
            <h2>Click on shape to select it</h2>
            <div className='single-shape-container'>
                <div className='shape' id='circle' onClick={selectCircle}></div>
                <div className='shape-caption'>Cost: {shapeCosts.circle} pts</div>
            </div>
            <div className='single-shape-container'>
                <div className='shape' id='triangle' onClick={selectTriangle}></div>
                <div className='shape-caption'>Cost: {shapeCosts.triangle} pts</div>
            </div>
            <div className='single-shape-container'>
                <div className='shape' id='square' onClick={selectSquare}></div>
                <div className='shape-caption'>Cost: {shapeCosts.square} pts</div>
            </div>
            <div className='single-shape-container'>
                <div className='shape' id='rectangle' onClick={selectRectangle}></div>
                <div className='shape-caption'>Cost: {shapeCosts.rectangle} pts</div>
            </div>
          </div>
        
          <div id="canvas-container">
            <h2>Draw Your Avatar</h2>
            <p id='error-message'></p>
            <canvas ref={canvas} id="canvas" width='300' height='300' onClick={handleCanvasClick} onMouseLeave={handleCanvasLeave} onMouseMove={handleCanvas}></canvas>
            <div id='buttons'>
              <button onClick={saveAvatar}>Save Avatar</button>
              <button onClick={resetShapes}>Clear Canvas</button>
              <button onClick={clearLastShape} onMouseLeave={handleRerender}> Clear Last Shape </button>
            </div>
          </div>
          
        </div>
        <div id='canvasImg'></div>
      </div>
      
          
    </React.Fragment>
  );
}

export default EditProfile;