import React, { useState, useRef, useEffect } from 'react';
import '../App.css';
import '../style/shapes.css';


const EditProfile = () => {
    
  const [selected, changeSelected] = useState(false);
  const [shapes, updateShapes] = useState([]);
  const [shapeSize, setSize] = useState(50);
  const [rotation, setRotation] = useState(0);
  const canvas = useRef();

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
      console.log("Bigger size");
      setSize((prevSize) => (prevSize + 10) > 100 ? 100 : (prevSize + 5));
    } else if (key === 's') {
      console.log("Smaller size");
      setSize((prevSize) => (prevSize - 10) < 10 ? 10 : (prevSize - 5));
    }
  }

  const handleRotate = (key) => {
    if (key === 'a') {
      console.log("Rotating anti-clockwise");
      setRotation((prevRotation) => ((prevRotation - 90) < 0 ? 270 : (prevRotation - 90)));
    } else if (key === 'd') {
      console.log("Rotating clockwise");
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

    updateShapes([...shapes, {type: selected, x, y, size: shapeSize, rotation}]);
  }

  const handleCanvasLeave = (evt) => {
    var rect = canvas.current.getBoundingClientRect();
    renderSavedShapes(evt.clientX - rect.left, evt.clientY - rect.top);
  }

  const saveAvatar = () => {
    const dataURL = canvas.current.toDataURL();
    console.log(dataURL);

    //Save to database
    var image = new Image();
    image.id = "pic";
    image.src = dataURL;
    document.getElementById('canvasImg').appendChild(image);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({imgURL: dataURL})
    };
    console.log(requestOptions);
    
    fetch('/profile/updateimg', requestOptions)
      .catch(err => console.log(err))

  }

  return (
    <React.Fragment>
      <div className='back-button'><a href='/profile'>⟵   Back</a></div>
      <div id="edit-profile-page">
        <div id='shapes-container'>
          <h2>Click on shape to select it</h2>
          <div className='single-shape-container'>
              <div id='circle' onClick={selectCircle}></div>
              <div className='shape-caption'>40 pts</div>
          </div>
          <div className='single-shape-container'>
              <div id='triangle' onClick={selectTriangle}></div>
              <div className='shape-caption'>60 pts</div>
          </div>
          <div className='single-shape-container'>
              <div id='square' onClick={selectSquare}></div>
              <div className='shape-caption'>60 pts</div>
          </div>
          <div className='single-shape-container'>
              <div id='rectangle' onClick={selectRectangle}></div>
              <div className='shape-caption'>4000 pts</div>
          </div>
        </div>
       
        <canvas ref={canvas} id="canvas" width='300' height='300' onClick={handleCanvasClick} onMouseLeave={handleCanvasLeave} onMouseMove={handleCanvas}></canvas>
        <div id='buttons'>
          <button onClick={saveAvatar}>Save Avatar</button>
          <button onClick={resetShapes}>Clear Canvas</button>
        </div>
      </div>
      <div id='canvasImg'></div>
          
    </React.Fragment>
  );
}

export default EditProfile;