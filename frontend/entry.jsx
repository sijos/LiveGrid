import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './components/grid';

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDOM.render(<Grid />, root);
});