import React from 'react';
import Tone from 'tone';

// const timeColToNotes 

class Sequencer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.createPart = this.createPart.bind(this);
  }

  componentDidMount() {
    console.log(this.props.grid);
    this.createPart();
    Tone.Transport.start();
  }

  componentWillReceiveProps() {
    console.log(this.props.grid);
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
      synth.triggerAttackRelease(note, "32n", time);
    }, [[0, []]]);
    part.loop = true;
    part.loopEnd = "1m";
    part.start(0);
    part.add(0, ["C3", "D3", "E3", "C4", "G4", "A4"]);
    // this.setState({ part }); // add once state part working
  }

  updateNotes() {
    // add this method to update once state is ready
    // this.state.part.add() this.props.notes
  }

  render() {
    return <p></p>;
  }
}

export default Sequencer;