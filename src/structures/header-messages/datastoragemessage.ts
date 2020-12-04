import { Writeable } from "./../writeable.js";

export class DataStorageMessage extends Writeable {
  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 2); //version
    dataview.setUint8(offset + 1, 2); //space allocation time
    dataview.setUint8(offset + 2, 1); //fill value write time
    dataview.setUint8(offset + 3, 0); //fill value defined
    return 4;
  }

  getLength(): number {
    return 4;
  }
}
