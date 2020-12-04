import { Writeable } from "./../writeable.js";
import { Datatype } from "./../../dataset.js";

export class DatatypeMessage extends Writeable {
  dataType: Datatype;

  constructor(dataType: Datatype) {
    super();
    this.dataType = dataType;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 2); //version 2
    switch (this.dataType) {
      case Datatype.FLOAT64:
        dataview.setUint8(offset + 1, 0x20);
        dataview.setUint8(offset + 2, 0x3f);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 8, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 0x40, true);
        dataview.setUint8(offset + 12, 0x34);
        dataview.setUint8(offset + 13, 0x0b);
        dataview.setUint8(offset + 14, 0x00);
        dataview.setUint8(offset + 15, 0x34);
        dataview.setUint32(offset + 16, 0x03ff, true);
        return 20;
      default:
        return 8;
    }
  }

  getLength(): number {
    switch (this.dataType) {
      case Datatype.FLOAT64:
        return 8 + 12;
      default:
        return 8;
    }
  }
}
