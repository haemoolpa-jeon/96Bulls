import React from 'react';
import '../App.css';


class EditProfile extends React.Component {
    
    selectShape = (shapeName) => {
        console.log('selecting:', shapeName)
 
        document.getElementById(shapeName).classList.add('selected');
    }

    selectCircle = () => {this.selectShape('circle')}

    selectTriangle = () => {this.selectShape('triangle')}

    selectSquare = () => {this.selectShape('square')}

    selectRectangle = () => {this.selectShape('rectangle')}

    render() {
        return (
            <React.Fragment>
                <div className='back-button'><a href='/profile'>⟵   Back</a></div>
                <div id="edit-profile-page">
                    <div style={{margin: 'auto'}}>
                        <div style={{fontSize: 20, fontWeight: 500}}>
                            <i>Select a shape to start editing</i>
                        </div>
                        <div id='shape-container'>
                            <div className='single-shape-container'>
                                <div id='circle' onClick={this.selectCircle}></div>
                                <div className='shape-caption'>40 pts</div>
                            </div>
                            <div className='single-shape-container'>
                                <div id='triangle' onClick={this.selectTriangle}></div>
                                <div className='shape-caption'>60 pts</div>
                            </div>
                            <div className='single-shape-container'>
                                <div id='square' onClick={this.selectSquare}></div>
                                <div className='shape-caption'>60 pts</div>
                            </div>
                            <div className='single-shape-container'>
                                <div id='rectangle' onClick={this.selectRectangle}></div>
                                <div className='shape-caption'>4000 pts</div>
                            </div>
                        </div>
                        <div style={{textAlign: 'right', paddingRight: 40, paddingTop: 20}}>
                            <i>Click to purchase shape</i>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default EditProfile;