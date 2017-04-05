import React from 'react';

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { status: "off" };
    this.toggleStatus = this.toggleStatus.bind(this);
  }

  toggleStatus(e) {
    e.preventDefault();
    const status = this.state.status === "off" ? "on" : "off";
    this.setState({ status });
  }
  
  render() {
    return(
      <div className={`tile ${this.state.status}`}
           onClick={this.toggleStatus}>[ ]
      </div>
    );
  }
}

export default Tile;