import P5 from 'p5';
import { Player } from './elements';
import PositionsMap from './map/positions-map';
declare class InputHandler {
    private p5;
    private player;
    private positionsMap;
    constructor(p5: P5, player: Player, positionsMap: PositionsMap);
    keyPressed(): void;
    private movePlayer;
}
export default InputHandler;
