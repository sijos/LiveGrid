import React from 'react';
import Tone from 'tone';
import Tile from './tile';

class Column extends React.Component {
  constructor(props) {
    super(props);
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
      <div className="grid-col">
        { col }
      </div>
    );
  }
}

export default Column;