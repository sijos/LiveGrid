import React from 'react';
import Tile from './tile';

class Grid extends React.Component {


  renderRow(colId) {
    let row = Array.from(Array(16).keys());
    row = row.map(rowId => <Tile colId={colId} rowId={rowId}
                           key={`${rowId}, ${colId}`} />);
    return (
      <div className="grid-row" key={colId}>
        { row }
      </div>
    );
  }

  render() {
    const cols = Array.from(Array(16).keys());
    const grid = cols.map(colId => this.renderRow(colId));
    return(
      <div className="grid-box">{grid}</div>
    );
  }
}

export default Grid;