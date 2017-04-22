// import Interface from './build/interface';

let panel = new Interface.Panel({
  useRelativeSizesAndPositions: true,
  x: 650,
});

let slider = new Interface.Slider({
  isVertical: false,
  bounds: [0, 0, .1, .2],
  min: 80,
  max: 200,
  value: 120,
  drag: function(val) { console.log(val); }
});

panel.add(slider);