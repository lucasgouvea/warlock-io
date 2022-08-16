import CommandTypeEnum from './command-type-enum';

abstract class AbstractCommand<T> {
  public type: CommandTypeEnum;

  public data: T;

  constructor(type: CommandTypeEnum, data: T) {
    this.type = type;
    this.data = data;
  }
}

export default AbstractCommand;
