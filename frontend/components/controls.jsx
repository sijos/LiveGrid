import React from 'react';
import Tone from 'tone';
import Interface from '../../build/interface';
import { fxMap, noteSets } from './constants';

const defaultState = {
  fx1: { on: false, name: "Delay", effect: fxMap["Delay"]() },
  fx2: { on: false, name: "BitCrusher", effect: fxMap["BitCrusher"]() },
  fx3: { on: false, name: "Chorus", effect: fxMap["Chorus"]() },
  bpm: 120,
  playing: true
};

class Controls extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    this.toggleFx = this.toggleFx.bind(this);
    this.renderFx = this.renderFx.bind(this);
    this.setFx = this.setFx.bind(this);
    this.play = this.play.bind(this);
  }

  componentDidMount() {
    let middle = window.innerWidth / 2;
    let panel = new Interface.Panel({
      useRelativeSizesAndPositions: false
    });

    let slider = new Interface.Slider({
      isVertical: false,
      bounds: [middle + 220, 174, 190, 28],
      min: 80,
      max: 200,
      value: 120,
      onvaluechange: () => {
        if(slider.value) { this.setTempo( slider.value ); }
      }
    });

    let knob1 = new Interface.Knob({ 
      bounds: [middle + 310, 320, 55, 55],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob1.value) { this.setDryWet( knob1.value, "fx1"); }
      }
    });

    let knob2 = new Interface.Knob({ 
      bounds: [middle + 310, 421, 55, 55],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob2.value) { this.setDryWet( knob2.value, "fx2"); }
      }
    });

    let knob3 = new Interface.Knob({ 
      bounds: [middle + 310, 525, 55, 55],
      value: 0.75,
      usesRotation: true,
      centerZero: false,
      onvaluechange: () => {
        if(knob3.value) { this.setDryWet( knob3.value, "fx3"); }
      }
    });

    window.addEventListener("resize", () => {
      middle = window.innerWidth / 2;
      slider['x'] = middle + 220;
      knob1['x'] = middle + 310;
      knob2['x'] = middle + 310;
      knob3['x'] = middle + 310;
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
      this.setState(this.state);
    }
  }

  setFx(fxNum) {
    let fx = this.state[fxNum];
    return (e) => {
      if (fx.on) {
        this.toggleFx(fxNum)();
      }
      fx.name = e.target.value;
      fx.effect = fxMap[fx.name]();
      this.state[fxNum] = fx;
      this.setState(this.state);
    }
  }

  renderFx(fxNum) {
    let fx = this.state[fxNum];
    return (
      <section className="fx">
        <section>
          <label className="title">On/Off:</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={fx.on}
              onChange={this.toggleFx(fxNum)}/>
            <div className="slider round"></div>
          </label>
        </section>
        <section>
          <label className="title">Pick FX:</label>
          <select className="select" onChange={this.setFx(fxNum)} value={fx.name}>
            {Object.keys(fxMap).map((name) => (
              <option value={name} key={name}>{name}</option>
            ))}
          </select>
        </section>
        <p>Set dry/wet:</p>
      </section>
    );
  }

  render() {
    const buttonLogo = this.state.playing ?
      <i className="fa fa-pause-circle fa-3x" /> : 
      <i className="fa fa-play-circle fa-3x" />
    return (
      <div className="control-panel">
        <section className="grid-control">
          <label className="control-label">Grid Controls</label>
          <div className="left">
            <button className="play-pause"
                    onClick={this.play}>{buttonLogo}
            </button>
            <button className="clear"
                    onClick={this.props.clearGrid}>Clear Grid
            </button>
          </div>
          <div className="right">
            <label>Set Tempo/BPM:</label>
            <label className="bpm">{Math.round(this.state.bpm)}</label>
          </div>
        </section>
        <section className="note-select">
          <label>Choose scale type:</label>
          <select className="notes" onChange={this.props.setNotes}>
            {Object.keys(noteSets).map((set) => (
              <option value={set} key={set}>{set}</option>
            ))}
          </select>
        </section>
        {this.renderFx("fx1")}
        {this.renderFx("fx2")}
        {this.renderFx("fx3")}
      </div>
    );
  }
}

export default Controls;
