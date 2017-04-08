import React from 'react';
import ReactDOM from 'react-dom';
import Sequencer from './components/sequencer';

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDOM.render(<Sequencer />, root);
});