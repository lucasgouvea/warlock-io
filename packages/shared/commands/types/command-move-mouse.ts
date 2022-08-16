import AbstractCommand from '../abstract-command';
import CommandTypeEnum from '../command-type-enum';

type CommandMoveMouseData = { x: number; y: number };
class CommandMoveMouse extends AbstractCommand<CommandMoveMouseData> {
  constructor(data: CommandMoveMouseData) {
    super(CommandTypeEnum.MOVE_MOUSE, data);
  }
}

export { CommandMoveMouse, CommandMoveMouseData };
