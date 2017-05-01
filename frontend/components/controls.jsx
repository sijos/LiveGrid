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

  componentWillMount() {
  }

  componentDidMount() {
    let middle = window.innerWidth / 2;
    let panel = new Interface.Panel({
      useRelativeSizesAndPositions: false
    });

    let slider = new Interface.Slider({
      isVertical: false,
      bounds: [middle - 296, 18, 220, 28],
      min: 80,
      max: 200,
      value: 120,
      onvaluechange: () => {
        if(slider.value) { this.setTempo( slider.value ); }
      }
    });

    let knob1 = new Interface.Knob({ 
      bounds: [middle - 20, 0, 55, 55],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob1.value) { this.setDryWet( knob1.value, "fx1"); }
      }
    });

    let knob2 = new Interface.Knob({ 
      bounds: [middle + 100, 0, 55, 55],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob2.value) { this.setDryWet( knob2.value, "fx2"); }
      }
    });

    let knob3 = new Interface.Knob({ 
      bounds: [middle + 220, 0, 55, 55],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob3.value) { this.setDryWet( knob3.value, "fx3"); }
      }
    });

    window.addEventListener("resize", () => {
      middle = window.innerWidth / 2;
      slider['x'] = middle - 296;
      knob1['x'] = middle - 20;
      knob2['x'] = middle + 100;
      knob3['x'] = middle + 220;
      panel.refresh();
    });

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
      <i className="fa fa-pause-circle fa-3x" /> : 
      <i className="fa fa-play-circle fa-3x" />
    return (
      <div className="control-panel">
        <section className="grid-control">
          <div className="top">
            <button className="play-pause"
                    onClick={this.play}>{buttonLogo}
            </button>
            <button className="clear"
                    onClick={this.props.clearGrid}>Clear Grid
            </button>
          </div>
          <label>Set Tempo/BPM:</label>
          <label className="bpm">{Math.round(this.state.bpm)}</label>
        </section>
        <section className="fx">
          <label>{this.state.fx1.name}</label>
          <button onClick={this.toggleFx("fx1")}>FX1</button>
        </section>
        <section className="fx">
          <label>{this.state.fx2.name}</label>
          <button onClick={this.toggleFx("fx2")}>FX2</button>
        </section>
        <section className="fx">
          <label>{this.state.fx3.name}</label>
          <button onClick={this.toggleFx("fx3")}>FX3</button>
        </section>
      </div>
    );
  }
}

export default Controls;

        // <button onClick={this.stateLog.bind(this)}>State</button>