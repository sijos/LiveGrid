import React from 'react';
import Tile from './tile';
import AudioLoader from './audio_loader';
import Synths from './synths';
import Sequencer from './sequencer';

class Grid extends React.Component {


  renderCol(colId) {
    let col = Array.from(Array(16).keys());
    col = col.map(rowId => <Tile colId={colId} rowId={rowId}
                           key={`${rowId}, ${colId}`} />);
    return (
      <div className="grid-col" key={colId}>
        { col }
      </div>
    );
  }

  // this method for testing only
  play() {
    let sound = document.getElementById("aud-0");
    sound.play();
  }

  render() {
    const rows = Array.from(Array(16).keys());
    const grid = rows.map(colId => this.renderCol(colId));
    return(
      <div>
        <div className="grid-box">{grid}</div>
        <div className="tile" onClick={this.play.bind(this)}></div>
        <AudioLoader sampleSet="xylp" />
        <Sequencer />
        <Synths />
      </div>
    );
  }
}

export default Grid;