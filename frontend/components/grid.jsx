import React from 'react';
import Tile from './tile';
import AudioLoader from './audio_loader';
import Synths from './synths';
import Column from './column';
import Tone from 'tone';

class Grid extends React.Component {

  componentDidMount() {
    console.log(this.props.part);
  }

  // this method for testing only
  play() {
    // let sound = document.getElementById("aud-0");
    // sound.play();
    if (Tone.Transport.state === "stopped") {
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
    // console.log(this.props.part);
  }

  render() {
    const rows = Array.from(Array(16).keys());
    const grid = rows.map(colId => ( 
      <Column colId={colId} part={this.props.part} key={colId}/>
    ));
    return(
      <div>
        <div className="grid-box">{grid}</div>
        <div className="tile" onClick={this.play.bind(this)}></div>
        <Synths />
      </div>
    );
  }
}

export default Grid;