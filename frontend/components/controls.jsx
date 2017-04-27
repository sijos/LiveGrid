import React from 'react';
import Tone from 'tone';
import Interface from '../../build/interface';
import { fxMap } from './constants';

const defaultState = {
  fx1: { on: false, name: "Chorus", effect: fxMap["Chorus"]() },
  fx2: { on: false, name: "Phaser", effect: fxMap["Phaser"]() },
  fx3: { on: false, name: "JCReverb", effect: fxMap["JCReverb"]() },
  bpm: 120,
  playing: true
}

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.toggleFx = this.toggleFx.bind(this);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    let panel = new Interface.Panel({
      useRelativeSizesAndPositions: true
    });

    let slider = new Interface.Slider({
      isVertical: false,
      bounds: [0.25, 0.015, .25, .05],
      min: 80,
      max: 200,
      value: 120,
      onvaluechange: () => {
        if(slider.value) { this.setTempo( slider.value ); }
      }
    });

    let knob1 = new Interface.Knob({ 
      bounds: [0.52, 0, 0.05, 0.05],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob1.value) { this.setDryWet( knob1.value, "fx1"); }
      }
    });

    let knob2 = new Interface.Knob({ 
      bounds: [0.59, 0, 0.05, 0.05],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob2.value) { this.setDryWet( knob2.value, "fx2"); }
      }
    });

    let knob3 = new Interface.Knob({ 
      bounds: [0.66, 0, 0.05, 0.05],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob3.value) { this.setDryWet( knob3.value, "fx3"); }
      }
    });

    //remove before completion
    console.log(panel);

    panel.add(slider, knob1, knob2, knob3);
  }

  setTempo(value = 120) {
    this.setState({ bpm: value });
    Tone.Transport.bpm.value = value;
  }

  setDryWet(value, fxNum) {
    let fx = this.state[fxNum];
    fx.effect.wet.value = value;
    this.state[fxNum] = fx;
  }

  play() {
    if (Tone.Transport.state === "started") {
      Tone.Transport.pause();
      this.setState({ playing: false })
    } else {
      Tone.Transport.start();
      this.setState({ playing: true })
    }
  }

  toggleFx(fxNum) {
    let fx = this.state[fxNum];
    return () => {
      if (fx.on) {
        fx.effect.dispose();
        fx.effect = fxMap[fx.name]();
      } else {
        this.props.synth.chain(fx.effect, Tone.Master);
      }
      fx.on = !fx.on;
      this.state[fxNum] = fx;
    }
  }

  //remove before completion
  stateLog() {
    console.log(this.state);
  }

  render() {
    const buttonLogo = this.state.playing ?
      <i className="fa fa-pause-circle-o fa-3x" /> : 
      <i className="fa fa-play-circle-o fa-3x" />
    return (
      <div className="control-panel">
        <section className="grid-control">
          <button className="play-pause"
                  onClick={this.play}>{buttonLogo}
          </button>
          <button className="clear"
                  onClick={this.props.clearGrid}>Clear Grid
          </button>
        </section>
        <button onClick={this.toggleFx("fx1")}>FX1</button>
        <button onClick={this.toggleFx("fx2")}>FX2</button>
        <button onClick={this.toggleFx("fx3")}>FX3</button>
        <button onClick={this.stateLog.bind(this)}>State</button>
      </div>
    );
  }
}

export default Controls;
