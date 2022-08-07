/* eslint-disable no-new */
/* eslint-disable no-param-reassign */

import p5 from 'p5';
import Position from './position.js';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 40;
const INITIAL_POS = { x: 60, y: 60 };
const positionsMap = new Map();
const CIRCLE_RAIO = 5;

class Player {
  position = { x: INITIAL_POS.x, y: INITIAL_POS.y };

  mousePosition = { x: null, y: null };
}

const testPosition = new Position();

const player = new Player();

document.onmousemove = (e) => {
  player.mousePosition.x = e.x - 440;
  player.mousePosition.y = e.y - 140;
};

const sketch = (p) => {
  p.setup = () => {
    const canvas = p.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent('sketch-holder');
    for (let x = 0; x < CANVAS_WIDTH; x += GRID_SIZE) {
      for (let y = 0; y < CANVAS_HEIGHT; y += GRID_SIZE) {
        positionsMap.set(`${x},${y}`, null);
      }
    }

    positionsMap.set(`${INITIAL_POS.x},${INITIAL_POS.y}`, player);
  };

  p.draw = () => {
    p.background(220);
    p.stroke(0);
    p.strokeWeight(1);

    for (let x = 0; x < CANVAS_WIDTH; x += GRID_SIZE) {
      p.line(x, 0, x, CANVAS_HEIGHT);
    }

    for (let y = 0; y < CANVAS_HEIGHT; y += GRID_SIZE) {
      p.line(0, y, CANVAS_WIDTH, y);
    }

    for (const [key, value] of positionsMap) {
      const [x, y] = key.split(',').map((e) => Number(e));
      if (value !== null) {
        p.circle(x, y, 20);
        p.line(x, y, player.mousePosition.x, player.mousePosition.y); // distance between 2 points
        p.line(x, y, player.mousePosition.x, y); // adjacent side
        p.circle(player.mousePosition.x, player.mousePosition.y, CIRCLE_RAIO * 2); // opposite side

        /* const triangle = GeometryUtils.getRightTriangle(
        { x, y },
        { x: player.mousePosition.x, y: player.mousePosition.y },
      ); */

        const mousePosYIsBeneathPlayer = player.mousePosition.y - y > 0;

        const ca = player.mousePosition.x - x;
        const co = Math.abs(player.mousePosition.y - y);
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
        const yUn = (CIRCLE_RAIO * co2) / h;
        const xUn = (CIRCLE_RAIO * ca) / h;

        const armX = x + xUn * 2;
        const armY = y + yUn * 2;
        p.line(armX, armY, player.mousePosition.x, player.mousePosition.y);
      }
    }
  };

  p.keyPressed = () => {
    let newXPosition;
    let newYPosition;

    switch (p.keyCode) {
      case 65:
        newXPosition = player.position.x - GRID_SIZE;
        positionsMap.set(`${player.position.x},${player.position.y}`, null);
        player.position.x = newXPosition;
        positionsMap.set(`${newXPosition},${player.position.y}`, player);
        break;
      case 83:
        newYPosition = player.position.y + GRID_SIZE;
        positionsMap.set(`${player.position.x},${player.position.y}`, null);
        player.position.y = newYPosition;
        positionsMap.set(`${player.position.x},${newYPosition}`, player);
        break;
      case 68:
        newXPosition = player.position.x + GRID_SIZE;
        positionsMap.set(`${player.position.x},${player.position.y}`, null);
        player.position.x = newXPosition;
        positionsMap.set(`${newXPosition},${player.position.y}`, player);
        break;
      case 87:
        newYPosition = player.position.y - GRID_SIZE;
        positionsMap.set(`${player.position.x},${player.position.y}`, null);
        player.position.y = newYPosition;
        positionsMap.set(`${player.position.x},${newYPosition}`, player);
        break;
      default: break;
    }
  };
};

const containerElement = document.getElementById('sketch-holder');

// eslint-disable-next-line new-cap
new p5(sketch, containerElement);
