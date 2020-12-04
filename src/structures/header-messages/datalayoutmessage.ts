import { Writeable } from "./../writeable.js";

export class DataLayoutMessage extends Writeable {
  offset: bigint;
  size: bigint;

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 3); //version
    dataview.setUint8(offset + 1, 1); //layout class (1 = contiguous)
    dataview.setBigUint64(offset+2, this.offset, true);
    dataview.setBigUint64(offset+10, this.size, true);
    return 18;
  }

  getLength(): number {
    return 18;
  }

  setOffsetToData(offset: bigint) {
    this.offset = offset;
  }

  getOffsetToData(): bigint {
    return this.offset;
  }

  setDataSize(size: bigint) {
    this.size = size;
  }

  getDataSize(): bigint {
    return this.size;
  }
}
