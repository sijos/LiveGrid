import React from 'react';
import Tone from 'tone';

class Synths extends React.Component {

  synthDemo() {
    let synth = new Tone.Synth().toMaster();
    synth.triggerAttackRelease("C4", "4n");
  }

  render() {
    return (
      <div onClick={this.synthDemo.bind(this)}
        className="synth">Click to Play</div>
    );
  }
}

export default Synths;