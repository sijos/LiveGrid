import React from 'react';
import Tone from 'tone';
import Tile from './tile';
import { timeStarts } from './constants';

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bar: "stopped" };
    this.flashProgressBar = this.flashProgressBar.bind(this);
  }

  componentDidMount() {
    Tone.Transport.scheduleRepeat(
      this.flashProgressBar, "1m", timeStarts[this.props.colId]
    );
  }

  flashProgressBar() {
    this.setState({ bar: "playing" });
    setTimeout(() => this.setState({ bar: "stopped" }), 100);
  }

  render() {
    let col = Array.from(Array(16).keys());
    col = col.map(rowId => 
      <Tile part={this.props.part}
            colId={this.props.colId}
            rowId={rowId}
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