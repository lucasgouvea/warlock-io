import P5 from 'p5';
import Player from './elements/player';
declare class App {
    private player;
    private enemy;
    private positionsMap;
    private p5;
    private inputHandler;
    constructor(p5: P5);
    setup(p: P5): void;
    draw(): void;
    private drawGrid;
    private drawMapElements;
    keyPressed(): void;
    getPlayer(): Player;
}
export default App;
