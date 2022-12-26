# Connect 4
This is a Socket + React Connect 4 game to play in your network

## Installation
Run `npm i` in the `client` and `server` folders.

## Launch game
- Launch client by running `npm run build` and then in the client folder : (You can remove the PORT part, it's just to have 4s)
  - `SET PORT=4444 && serve -s build` on windows
  - `PORT=4444 serve -s build` on linux
- Launch server by running `node main.js` in the server folder
  
## Play
Connect to `localIP:4444` to play.
