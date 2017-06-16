import Tone from 'tone';

export const timeStarts = {
  0: 0,
  1: "16n",
  2: "8n",
  3: "16n + 8n",
  4: "4n",
  5: "4n + 16n",
  6: "4n + 8n",
  7: "4n + 8n + 16n",
  8: "2n",
  9: "2n + 16n",
  10: "2n + 8n",
  11: "2n + 8n + 16n",
  12: "2n + 4n",
  13: "2n + 4n + 16n",
  14: "2n + 4n + 8n",
  15: "2n + 4n + 8n + 16n"
};

//pentatonic
const pentatonic = {
  0: "C6",
  1: "A5",
  2: "G5",
  3: "E5",
  4: "D5",
  5: "C5",
  6: "A4",
  7: "G4",
  8: "E4",
  9: "D4",
  10: "C4",
  11: "A3",
  12: "G3",
  13: "E3",
  14: "D3",
  15: "C3"
};

//tetrachords
const tetraChords = {
  0: "A6",
  1: "Bb6",
  2: "C5",
  3: "B5",
  4: "Bb5",
  5: "A5",
  6: "A4",
  7: "C4",
  8: "B4",
  9: "D4",
  10: "Ab3",
  11: "Eb3",
  12: "F3",
  13: "Db3",
  14: "G3",
  15: "F3"
};

const triChords = {
  0: "G6",
  1: "F6",
  2: "E6",
  3: "C#6",
  4: "G5",
  5: "F#5",
  6: "B5",
  7: "Bb4",
  8: "A4",
  9: "G#4",
  10: "Eb3",
  11: "D3",
  12: "C3",
  13: "F2",
  14: "E2",
  15: "C#2"
};

const octaveJumper = {
  0: "A5",
  1: "A4",
  2: "A3",
  3: "E5",
  4: "E4",
  5: "E3",
  6: "F5",
  7: "F4",
  8: "F3",
  9: "G5",
  10: "G4",
  11: "G3",
  12: "C5",
  13: "C4",
  14: "C3",
  15: "C2"
};

const dreamy = {
  0: "A5",
  1: "E5",
  2: "D5",
  3: "C5",
  4: "A#5",
  5: "G#4",
  6: "F#4",
  7: "E4",
  8: "D4",
  9: "C4",
  10: "A#4",
  11: "G#3",
  12: "F#3",
  13: "E3",
  14: "D3",
  15: "C3"
};

export const noteSets = {
  Pentatonic: pentatonic,
  Tetrachords: tetraChords,
  Trichords: triChords,
  OctaveJumper: octaveJumper,
  Dreamy: dreamy
};

export const fxMap = {
  "Chorus": () => new Tone.Chorus({ "wet": 0.75 }),
  "Phaser": () => new Tone.Phaser({ 
    "wet": 0.75,
    "frequency": 0.3,
    "octaves": 4,
    "baseFrequency": 400
   }),
  "Reverb": () => new Tone.JCReverb(0.325, { "wet": 0.75}),
  // "AutoWah": () => new Tone.AutoWah(50, 6, -15, { "wet": 0.75}),
  "BitCrusher": () => new Tone.BitCrusher({ "wet": 0.75}),
  "Chebyshev": () => new Tone.Chebyshev(50, { "wet": 0.75}),
  "Distortion": () => new Tone.Distortion(0.5, { "wet": 0.75}),
  "Freeverb": () => new Tone.Freeverb({ "wet": 0.75}),
  "Delay": () => new Tone.PingPongDelay({ "wet": 0.75})
};