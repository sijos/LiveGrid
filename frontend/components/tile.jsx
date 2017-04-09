import React from 'react';
import Tone from 'tone';
import { timeStarts, synthNotes } from './constants';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "off", playing: "no" };
    this.toggleStatus = this.toggleStatus.bind(this);
    // this.flashProgress = this.flashProgress.bind(this);
  }

  // componentDidMount() {
  //   Tone.Transport.scheduleRepeat(
  //     this.flashProgress, "1m", timeStarts[this.props.colId]
  //   );
  // }
  

  // //refactor this to columns instead of indiv tiles
  // flashProgress() {
  //   this.setState({ playing: "yes" });
  //   // console.log(this.state);
  //   setTimeout(() => this.setState({ playing: "no" }), 150);
  // }

  toggleStatus() {
    let status;
    
    const time = timeStarts[this.props.colId];
    const note = synthNotes[this.props.rowId];
    if (this.state.status === "off") {
      status = "on";
      this.props.part.add(time, note);
    } else {
      status = "off";
      this.props.part.remove(time, note);
    }
    this.setState({ status });
  }
  
  render() {
    return(
      <div className={`tile ${this.state.status} ${this.state.playing}`}
           onClick={this.toggleStatus}
           id={[this.props.colId, this.props.rowId]}>
      </div>
    );
  }
}

export default Tile;