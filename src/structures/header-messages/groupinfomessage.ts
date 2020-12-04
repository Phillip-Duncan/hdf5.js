import { Writeable } from "./../writeable.js";

export class GroupInfoMessage extends Writeable {
  write(arrayBuffer: never, offset: never): number {
    //all 0s
    return 4;
  }

  getLength(): number {
    return 4;
  }
}
