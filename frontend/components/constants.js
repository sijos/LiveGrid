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
export const synthNotes = {
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

export const fxMap = {
  "Chorus": () => new Tone.Chorus({ "wet": 0.5 }),
  "Phaser": () => new Tone.Phaser({ 
    "wet": 0.5,
    "frequency": 0.3,
    "octaves": 4,
    "baseFrequency": 400
   }),
  "Reverb": () => new Tone.JCReverb(0.325, { "wet": 0.5}),
  // "AutoWah": () => new Tone.AutoWah(50, 6, -15, { "wet": 0.5}),
  "BitCrusher": () => new Tone.BitCrusher({ "wet": 0.5}),
  "Chebyshev": () => new Tone.Chebyshev(50, { "wet": 0.5}),
  "Distortion": () => new Tone.Distortion(0.5, { "wet": 0.5}),
  "Freeverb": () => new Tone.Freeverb({ "wet": 0.5}),
  "Delay": () => new Tone.PingPongDelay({ "wet": 0.5})
};