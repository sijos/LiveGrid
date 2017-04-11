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

  render() {
    return (
      <div className="control-panel">
        <button className="play-pause"
                onClick={this.play}>Play/Pause
        </button>
      </div>
    );
  }
}

export default Controls;
