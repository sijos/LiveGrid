import React from 'react';
import Tone from 'tone';
import Tile from './tile';
import { timeStarts } from './constants';

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: "stopped" };
    this.flashProgressOn = this.flashProgressOn.bind(this);
    this.flashProgressOff = this.flashProgressOff.bind(this);
  }

  componentDidMount() {
    Tone.Transport.scheduleRepeat(
      this.flashProgressOn, "1m", timeStarts[this.props.colId]
    );
    Tone.Transport.scheduleRepeat(
      this.flashProgressOff, "1m", `${timeStarts[this.props.colId]} + 16n`
    );
  }

  flashProgressOn() {
    this.setState({ bar: "playing" });
  }

  flashProgressOff() {
    this.setState({ bar: "stopped "});
  }


  render() {
    let col = Array.from(Array(16).keys());
    col = col.map(rowId => 
      <Tile colId={this.props.colId} rowId={rowId}
            val={this.props.vals[rowId]}
            toggleTile={this.props.toggleTile}
            key={`${rowId}, ${this.props.colId}`} />
    );
    return (
      <div className={`grid-col ${this.state.bar}`}>
        { col }
      </div>
    );
  }
}

export default Column;