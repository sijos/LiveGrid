import React from 'react';
import Tone from 'tone';
import { timeStarts, synthNotes } from './constants';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "off" };
    this.toggleStatus = this.toggleStatus.bind(this);
  }

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
      <div className={`tile ${this.state.status}`}
           onClick={this.toggleStatus}
           id={[this.props.colId, this.props.rowId]}>
      </div>
    );
  }
}

export default Tile;