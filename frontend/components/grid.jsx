import React from 'react';
import Tile from './tile';
import Controls from './controls';
import Column from './column';
import Tone from 'tone';

class Grid extends React.Component {

  componentDidMount() {
    console.log(this.props.part);
  }

  render() {
    const rows = Array.from(Array(16).keys());
    const grid = rows.map(colId => ( 
      <Column colId={colId} part={this.props.part} key={colId}/>
    ));
    return(
      <div>
        <div className="grid-box">{grid}</div>
        <Controls />
      </div>
    );
  }
}

export default Grid;