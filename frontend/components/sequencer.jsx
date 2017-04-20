import React from 'react';
import Tone from 'tone';
import Grid from './grid';

// const timeColToNotes 

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createPart = this.createPart.bind(this);
  }

  componentWillMount() {
    this.createPart();
    Tone.Transport.start();
  }


  createPart() {
    let synth = new Tone.PolySynth(10, Tone.FMSynth, {
      "oscillator" : {
        "type" : "fatsawtooth",
        "count" : 3,
        "spread" : 30
      },
      "envelope": {
        "attack": 0.01,
        "decay": 0.1,
        "sustain": 0.5,
        "release": 0.4,
        "attackCurve" : "exponential"
      },
    }).toMaster();

    let part = new Tone.Part((time, note) => {
      synth.triggerAttackRelease(note, "16n", time);
    }, [[0, []]]);
    part.loop = true;
    part.loopEnd = "1m";
    part.start(0);
    this.state.part = part;
    this.state.synth = synth;
  }

  render() {
    return <div><Grid part={this.state.part} synth={this.state.synth}/></div> ;
  }
}

export default Sequencer;