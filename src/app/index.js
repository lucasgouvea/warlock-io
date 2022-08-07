/* eslint-disable no-new */
/* eslint-disable no-param-reassign */

import p5 from 'p5';

import Player from './player.js';
import Position from './position.js';
import PositionsMap from './positions-map.js';

class App {
  player;

  positionsMap;

  static CANVAS_WIDTH = 400;

  static CANVAS_HEIGHT = 400;

  static GRID_SIZE = 40;

  static CIRCLE_RADIUS = 5;

  static INITIAL_POS = new Position(60, 60);

  constructor() {
    this.player = new Player(App.INITIAL_POS);
    this.positionsMap = new PositionsMap();
  }
}

const sketch = (p) => {
  const app = new App();
  p.setup = () => {
    const canvas = p.createCanvas(App.CANVAS_WIDTH, App.CANVAS_HEIGHT);
    canvas.parent('sketch-holder');

    app.positionsMap.set(app.player.position, app.player);

    document.onmousemove = (e) => {
      app.player.mousePosition.x = e.x - 440;
      app.player.mousePosition.y = e.y - 140;
    };
  };

  p.draw = () => {
    p.background(220);
    p.stroke(0);
    p.strokeWeight(1);

    for (let x = 0; x < App.CANVAS_WIDTH; x += App.GRID_SIZE) {
      p.line(x, 0, x, App.CANVAS_HEIGHT);
    }

    for (let y = 0; y < App.CANVAS_HEIGHT; y += App.GRID_SIZE) {
      p.line(0, y, App.CANVAS_WIDTH, y);
    }

    for (const [key, value] of app.positionsMap.map) {
      const [x, y] = key.split(',').map((e) => Number(e));
      if (value !== null) {
        p.circle(x, y, 20);
        p.line(x, y, app.player.mousePosition.x, app.player.mousePosition.y); // distance between 2 points
        p.line(x, y, app.player.mousePosition.x, y); // adjacent side
        p.circle(app.player.mousePosition.x, app.player.mousePosition.y, App.CIRCLE_RADIUS * 2); // opposite side

        const mousePosYIsBeneathPlayer = app.player.mousePosition.y - y > 0;

        const ca = app.player.mousePosition.x - x;
        const co = Math.abs(app.player.mousePosition.y - y);
        const m = co / ca;

        const angleRadians = Math.atan(m);
        const complementAngleRadians = Math.PI / 2 - angleRadians;
        const co2 = Math.tan(complementAngleRadians) * ca;

        p.line(x + ca, y, x + ca, mousePosYIsBeneathPlayer ? y + co : y - co);
        p.stroke(80, 204, 44);
        /* line(x, y, x + ca, y + co2) */
        /* line(x + ca, y, x + ca, mousePosYisBeneathPlayer ? y - co2 : y + co2); */

        p.stroke(255, 0, 0);
        const h = Math.sqrt(ca ** 2 + co2 ** 2);
        const yUn = (App.CIRCLE_RADIUS * co2) / h;
        const xUn = (App.CIRCLE_RADIUS * ca) / h;

        const armX = x + xUn * 2;
        const armY = y + yUn * 2;
        p.line(armX, armY, app.player.mousePosition.x, app.player.mousePosition.y);
      }
    }
  };

  p.keyPressed = () => {
    let newXPosition;
    let newYPosition;

    switch (p.keyCode) {
      case 65:
        newXPosition = app.player.position.x - App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.x = newXPosition;
        app.positionsMap.set({ ...app.player.position, x: newXPosition }, app.player);
        break;
      case 83:
        newYPosition = app.player.position.y + App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.y = newYPosition;
        app.positionsMap.set({ ...app.player.position, y: newYPosition }, app.player);
        break;
      case 68:
        newXPosition = app.player.position.x + App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.x = newXPosition;
        app.positionsMap.set({ ...app.player.position, x: newXPosition }, app.player);
        break;
      case 87:
        newYPosition = app.player.position.y - App.GRID_SIZE;
        app.positionsMap.set(app.player.position, null);
        app.player.position.y = newYPosition;
        app.positionsMap.set({ ...app.player.position, y: newYPosition }, app.player);
        break;
      default: break;
    }
  };
};

const containerElement = document.getElementById('sketch-holder');

// eslint-disable-next-line new-cap
new p5(sketch, containerElement);
