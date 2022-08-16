import AbstractCommand from '../abstract-command';
import CommandTypeEnum from '../command-type-enum';

enum CommandMovePlayerData {
  A = 65,
  S = 83,
  D = 68,
  W = 87,
}

class CommandMovePlayer extends AbstractCommand<CommandMovePlayerData> {
  constructor(data: CommandMovePlayerData) {
    super(CommandTypeEnum.MOVE_PLAYER, data);
  }
}

export { CommandMovePlayer, CommandMovePlayerData };
