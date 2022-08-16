import AbstractCommand from '../abstract-command';
import CommandTypeEnum from '../command-type-enum';

type CommandClickData = { x: number, y: number}
class CommandClick extends AbstractCommand<CommandClickData> {
  constructor(data: CommandClickData) {
    super(CommandTypeEnum.CLICK, data);
  }
}

export { CommandClick, CommandClickData };
