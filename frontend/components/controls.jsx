import React from 'react';
import Tone from 'tone';
import Interface from '../../build/interface';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fx1: false,
      bpm: 120
    };
  }

  componentDidMount() {
    let panel = new Interface.Panel({
      useRelativeSizesAndPositions: true
    });

    let slider = new Interface.Slider({
      isVertical: false,
      bounds: [0, 0, .1, .2],
      min: 80,
      max: 200,
      value: 120,
      onvaluechange: () => {
        if(slider.value) { this.setTempo( slider.value ); }
      }
    });

    panel.add(slider);
  }

  setTempo(value = 120) {
    this.setState({ bpm: value });
    Tone.Transport.bpm.value = value;
  }

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

  stateLog() {
    console.log(this.state);
    console.log(Tone.Transport.bpm.value);
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
        <button onClick={this.stateLog.bind(this)}>State</button>
      </div>
    );
  }
}

export default Controls;


// () => {
//         if (slider.value) {
//           this.setState({ bpm: slider.value });
//           Tone.Transport.bpm.value = slider.value;
//         }
// }