import { Writeable } from "./../writeable.js";
import { Datatype } from "./../../dataset.js";

export class DatatypeMessage extends Writeable {
  dataType: Datatype;
  longestString: number;

  constructor(dataType: Datatype) {
    super();
    this.dataType = dataType;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    switch (this.dataType) {
      case Datatype.FLOAT64:
        dataview.setUint8(offset, 0x11); //version 1, floating point
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
      case Datatype.INT64:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00001000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 8, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 64, true);
        return 12;
      case Datatype.UINT64:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00000000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 8, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 64, true);
        return 12;
      case Datatype.INT32:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00001000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 4, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 32, true);
        return 12;
      case Datatype.UINT32:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00000000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 4, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 32, true);
        return 12;
      case Datatype.INT16:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00001000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 2, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 16, true);
        return 12;
      case Datatype.UINT16:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00000000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 2, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 16, true);
        return 12;
      case Datatype.INT8:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00001000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 1, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 8, true);
        return 12;
      case Datatype.UINT8:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00000000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 1, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 8, true);
        return 12;
      case Datatype.INT64:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00001000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 8, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 64, true);
        return 12;
      case Datatype.UINT64:
        dataview.setUint8(offset, 0x10); //version 1, fixed point
        dataview.setUint8(offset + 1, 0b00000000); // 3: signed bit
        dataview.setUint8(offset + 2, 0x00);
        dataview.setUint8(offset + 3, 0x00);
        dataview.setUint32(offset + 4, 8, true);
        //property:
        dataview.setUint16(offset + 8, 0, true);
        dataview.setUint16(offset + 10, 64, true);
        return 12;
      case Datatype.STRING:
        dataview.setUint8(offset, 0x13); //version 1, string
        dataview.setUint8(offset + 1, 0x10); // utf-8
        dataview.setUint32(offset + 4, this.longestString+1, true);
        return 8;
      default:
        return 8;
    }
  }

  getLength(): number {
    switch (this.dataType) {
      case Datatype.FLOAT64:
        return 8 + 12;
      case Datatype.INT64:
      case Datatype.UINT64:
      case Datatype.INT32:
      case Datatype.UINT32:
      case Datatype.INT16:
      case Datatype.UINT16:
      case Datatype.INT8:
      case Datatype.UINT8:
        return 8 + 4;
      case Datatype.STRING:
        return 8;
      default:
        return 8;
    }
  }

  setLongestString(longestString: number) {
    this.longestString = longestString;
  }
}
