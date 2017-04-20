import React from 'react';
import Tile from './tile';
import Controls from './controls';
import Column from './column';
import Tone from 'tone';
import { timeStarts, synthNotes } from './constants';

const defaultGrid = () => {
  let result = [];
  for (let i = 0; i < 16; i++) {
    let row = [];
    for (let j = 0; j < 16; j++) {
      row.push(false);
    }
    result.push(row);
  }
  return result;
};

class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { grid: defaultGrid() };
    this.setTile = this.setTile.bind(this);
    this.toggleTile = this.toggleTile.bind(this);
    this.clearGrid = this.clearGrid.bind(this);
  }

  // delete later
  componentDidMount() {
    console.log(this.props.part);
  }

  setTile(pos, value) {
    let newGrid = this.state.grid;
    let [row, col] = pos;
    newGrid[row][col] = value;
    this.setState({ grid: newGrid });
  }

  toggleTile(pos) {
    let [row, col] = pos;
    let newVal = !this.state.grid[row][col];
    const note = synthNotes[row];
    const time = timeStarts[col];
    if (newVal) {
      this.props.part.add(time, note);
    } else {
      this.props.part.remove(time, note);
    }
    this.setTile(pos, newVal);
  }

  renderCol(colId) {
    let col = this.state.grid.map((val, idx) => (val[colId]));
    return (
      <Column colId={colId} vals={col}
              toggleTile={this.toggleTile} key={colId}/>
    );
  }

  clearGrid() {
    this.setState({ grid: defaultGrid() });
    this.props.part.removeAll();
  }

  render() {
    const rows = Array.from(Array(16).keys());
    const grid = rows.map(colId => this.renderCol(colId));
    return(
      <div>
        <div className="grid-box">{grid}</div>
        <Controls clearGrid={this.clearGrid} 
          synth={this.props.synth} part={this.props.part}/>
      </div>
    );
  }
}

export default Grid;