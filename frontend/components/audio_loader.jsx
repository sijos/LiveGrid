import React from 'react';

const AudioLoader = ({ sampleSet }) => {
  let audios = Array.from(Array(16).keys());
  audios = audios.map(idx => (
    <audio id={`aud-${idx}`}
           key={idx}
           src={`audio/${sampleSet}/${idx}.wav`}
           preload="auto">
    </audio>
  ));

  return (
    <div>{ audios }</div>
  );
};

export default AudioLoader;
