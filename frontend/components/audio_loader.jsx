import React from 'react';

const audioLoader = ({ sampleSet }) => {
  let audios = Array.from(Array(16).keys());
  audios.map(idx => {
    <audio id={`aud-${idx}`}
          src={`audio/${sampleSet}/${idx}.wav`}
          preload="auto">
    </audio>
  });

  return (
    <div> { audios } </div>
  );
};

export default audioLoader;