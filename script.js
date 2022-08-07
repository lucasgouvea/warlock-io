const CANVAS_WIDTH = 400
const CANVAS_HEIGHT = 400
const GRID_SIZE = 40
const GRID_X_OFFSET = 20
const GRID_Y_OFFSET = 20
const INITIAL_POS = { x: 60, y: 60 }
const positionsMap = new Map()

class Player {
	position = { x: INITIAL_POS.x, y: INITIAL_POS.y }
}

const player = new Player()

function setup() {
	const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    canvas.parent("sketch-holder");
	for(let x = 0; x < CANVAS_WIDTH; x += GRID_SIZE) {
		for(let y = 0; y < CANVAS_HEIGHT; y += GRID_SIZE) {
			positionsMap.set(`${x},${y}`, null)
		}
	}

	positionsMap.set(`${INITIAL_POS.x},${INITIAL_POS.y}`, player)

}

function draw() {
	background(220);
	stroke(0);
	strokeWeight(1);


	for (var x = 0; x < CANVAS_WIDTH; x += GRID_SIZE) {
		line(x, 0, x, CANVAS_HEIGHT);
	}

	for (var y = 0; y < CANVAS_HEIGHT; y += GRID_SIZE) {
		line(0, y, CANVAS_WIDTH, y);
	}


	for (var [key, value] of positionsMap) {
		const [x,y] = key.split(',').map((e) => Number(e))
		if(value !== null) {
			circle(x, y, 20);
		}
  		
	}

}

function keyPressed() {
	let newXPosition
	let newYPosition

	switch(keyCode) {
		case 65:
			newXPosition = player.position.x - GRID_SIZE 
			positionsMap.set(`${player.position.x},${player.position.y}`, null)
			player.position.x = newXPosition
			positionsMap.set(`${newXPosition},${player.position.y}`, player)
			break
		case 83:
			newYPosition = player.position.y + GRID_SIZE
			positionsMap.set(`${player.position.x},${player.position.y}`, null)
			player.position.y = newYPosition
			positionsMap.set(`${player.position.x},${newYPosition}`, player)
			break
		case 68:
			newXPosition = player.position.x + GRID_SIZE 
			positionsMap.set(`${player.position.x},${player.position.y}`, null)
			player.position.x = newXPosition
			positionsMap.set(`${newXPosition},${player.position.y}`, player)
			break
		case 87:
			newYPosition = player.position.y - GRID_SIZE
			positionsMap.set(`${player.position.x},${player.position.y}`, null)
			player.position.y = newYPosition
			positionsMap.set(`${player.position.x},${newYPosition}`, player)
		break
	}
  
}
