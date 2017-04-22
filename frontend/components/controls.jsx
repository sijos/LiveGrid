import React from 'react';
import Tone from 'tone';
import Interface from '../../build/interface';

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fx1: {
        on: false,
        effect: new Tone.Chorus({ "wet": 0.75 }),
        name: "Chorus"
      },
      bpm: 120
    };
    this.toggleFx = this.toggleFx.bind(this);
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

    let knob1 = new Interface.Knob({ 
      bounds: [0.5, 0, 0.1, 0.1],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob1.value) { this.setDryWet( knob1.value, "fx1"); }
      }
    });

    console.log(panel);

    panel.add(slider, knob1);
  }

  setTempo(value = 120) {
    this.setState({ bpm: value });
    Tone.Transport.bpm.value = value;
  }

  setDryWet(value, fxNum) {
    let fx = this.state[fxNum];
    fx.effect.wet.value = value;
    this.setState({ fx1: fx });
  }

  play() {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
    } else {
      Tone.Transport.start();
    }
  }

  toggleFx() {
    let fx = this.state.fx1;
    if (fx.on) {
      fx.effect.dispose();
      fx.effect = new Tone.Chorus;
    } else {
      this.props.synth.chain(fx.effect, Tone.Master);
    }
    fx.on = !fx.on;
    this.setState({ fx1: fx });
  }

  stateLog() {
    console.log(this.state);
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
        <button onClick={this.toggleFx}>FX</button>
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