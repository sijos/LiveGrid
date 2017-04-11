import React from 'react';
import Tone from 'tone';
import { timeStarts, synthNotes } from './constants';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  toggleStatus() {
    this.props.toggleTile([this.props.rowId, this.props.colId]);
  }
  
  render() {
    const display = (this.props.val) ? "on" : "off";
    return(
      <div className={`tile ${display}`}
           onClick={this.toggleStatus}
           id={[this.props.colId, this.props.rowId]}>
      </div>
    );
  }
}

export default Tile;