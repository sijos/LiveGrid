## LiveGrid

### Background

LiveGrid is a new take on a live music interface based on a looping sequence of sounds. The sounds are queued by a user's selection of squares on a 16 x 16 grid, each row representing a different sound and each column representing a beat within a measure. The squares highlight when selected and are then played in sequence as the vertical progress bar passes through each column. If this is unfamiliar, refer to [tonematrix][tonematrix] and [beatlab][beatlab] for two other previous implementations of this concept.

[tonematrix]: http://tonematrix.audiotool.com/
[beatlab]: http://www.beatlab.com/

The user can control the tempo via a slider/buttons but the time signature remains 4/4 so the grid structure can maintain control without changing size. The pitch of the sounds will fluctuate relative to each row's position on the grid, but all sounds are associated on the pentatonic scale (or percussive in nature) so the app's output audio will always be in-tune and appealing to the casual listener.

In addition to creating various short sound loops with the grid structure, the app will also have an 'ideas' section where the user can store a pattern they like so they can build off of it. This will save a pattern for 4, 8 or 16 measures while allowing the user to make a new loop with the grid structure that can be inserted before or after the previous idea.

### Functionality & MVP  

LiveGrid users will be able to:

- [ ] Select tempo and play/pause the audio track
- [ ] Click squares and see visual queues showing which squares are active/inactive
- [ ] Hear various sounds as the progress bar tracks through the grid
- [ ] Save patterns as 'ideas' in a timeline at the bottom of the screen to patch on and form longer sequences

In addition, this project will include:

- [ ] A tour button that shows a brief demo of the interface
- [ ] A production Readme

### Wireframes

This app will consist of a single screen with the grid, audio track controls, the tour button and nav links to the Github. Audio track controls will include a play/pause button as well as a tempo slider. There will be a 'save idea' button at the bottom which stores the grid pattern currently active to be chained together with other ideas.

![wireframes](images/wireframe.png)

### Architecture and Technologies

This project will be implemented with the following technologies:

- Vanilla JavaScript and `jquery` for overall structure and grid rendering,
- `Howler.js` to handle playing of primary audio track, integrate with Web Audio API and handle looping,
- `Ion.Sound` to handle playing of sounds on events,
- `Audiolet` to enable real-time audio synthesis,
- Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be three scripts involved in this project:

`grid.js`: this script will handle the rendering of the grid and which squares have been selected as active/inactive by the user. This will also render the progress bar (could just be different colors for the grid squares that changes in-time).

`sounds.js`: this script will be responsible for adding event listeners on each of the `grid`'s squares and serving up the proper sound at the correct time to the `track`.

`track.js`: this script will use `Audiolet` to compile all of the queued `sounds` that the user has queued into a single audio track that will be played in the browser using `Howler.js`. This script will also handle the logic for  playing/pausing the track and changing the tempo.

### Implementation Timeline

**Week 1**: Setup all necessary Node modules, including getting webpack up and running and `Howler.js` installed.  Create `webpack.config.js` as well as `package.json`.  Write a basic entry file and the bare bones of all 3 scripts outlined above.  Learn the basics of `Howler.js`.  Goals for the week:

- Render a full grid on the page that is fully interactive and shows visual response to user input.
- Obtain full library of sounds to be used in the app.
- Get a basic audio track playing in the browser that is fully controllable via `track.js`.

**Week 2**: Build out the `sounds.js` file to have a sound for each row in the grid. Learn enough of `Audiolet` to figure out how to combine the sounds into a single track. Experiment with timing and queue points so a sound is added to the 'queue' for the next loop instead of fired immediately on click.

**Week 3**: Put it all together. Get the queued sounds to update the real-time audio track before the next loop. Add the ability to save a pattern (by storing the grid state) as an 'idea' and later replay that idea as a part of a new sequence.


### Bonus features

Ideally I would like to add some additional features, including:

- [ ] Adding multiple sound sets the user could choose from
- [ ] Adding visualizer effects both in the grid and outside using WebGL graphic interface
- [ ] Adding cursor/keyboard input
