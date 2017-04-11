import React from 'react';
import Tone from 'tone';

class Controls extends React.Component {

  play() {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
  }

  // this doesnt work
  // clear() {
  //   let actives = Array.from(document.querySelectorAll('.on'));
  //   actives.forEach((tile) => tile.click());
  // }

  render() {
    return (
      <div className="control-panel">
        <button className="play-pause"
                onClick={this.play}>Play/Pause
        </button>
        <button className="clear"
                onClick={this.clear}>Clear Grid
        </button>
      </div>
    );
  }
}

export default Controls;
