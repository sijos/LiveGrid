import React from 'react';
import Tile from './tile';
import AudioLoader from './audio_loader';
import Synths from './synths';
import Tone from 'tone';

class Grid extends React.Component {

  componentDidMount() {
    console.log(this.props.part);
  }

  renderCol(colId) {
    let col = Array.from(Array(16).keys());
    col = col.map(rowId => <Tile part={this.props.part}
                            colId={colId} rowId={rowId}
                            key={`${rowId}, ${colId}`} />);
    return (
      <div className="grid-col" key={colId}>
        { col }
      </div>
    );
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
  }

  render() {
    const rows = Array.from(Array(16).keys());
    const grid = rows.map(colId => this.renderCol(colId));
    return(
      <div>
        <div className="grid-box">{grid}</div>
        <div className="tile" onClick={this.play.bind(this)}></div>
        <AudioLoader sampleSet="xylp" />
        <Synths />
      </div>
    );
  }
}

export default Grid;