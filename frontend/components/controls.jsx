import React from 'react';
import Tone from 'tone';
import { panel, slider } from '../../widgets';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fx1: false
    };
  }

  // componentWillMount() {
  //   console.log(panel);
  //   console.log(slider);
  //   panel.add(slider);
  // }

  play() {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
  }

  fxTest() {
    // console.log(this.props.synth);
    let chorus = new Tone.Chorus;
    this.props.synth.chain(chorus, Tone.Master);
    // let dist = new Tone.Distortion(0.9).toMaster();
    // Tone.Master.chain(dist);
  }

  render() {
    return (
      <div className="control-panel">
        <button className="play-pause"
                onClick={this.play}>Play/Pause
        </button>
        <button className="clear"
                onClick={this.props.clearGrid}>Clear Grid
        </button>
        <button onClick={this.fxTest.bind(this)}>FX</button>
      </div>
    );
  }
}

export default Controls;
