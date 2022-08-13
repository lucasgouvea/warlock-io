/* eslint-disable no-param-reassign */
/* eslint-disable no-new */
import P5 from 'p5';

import App from './app';

const socket = new WebSocket('ws://localhost:8888/player?id=60');
socket.onmessage = (event) => {
  console.log(event.data);
};

const sketch = (p5: P5) => {
  const app = new App(p5);

  p5.setup = () => {
    app.setup(p5);
  };
  p5.draw = () => {
    app.draw();
  };

  p5.keyPressed = () => {
    app.keyPressed();
  };

  p5.mouseClicked = () => {
    app.getPlayer().shoot();
  };
};

new P5(sketch);
