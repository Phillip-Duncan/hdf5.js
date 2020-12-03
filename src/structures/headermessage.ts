import { Writeable } from "./writeable.js";

export class HeaderMessage extends Writeable {
  type: number;
  flags: number;
  data: Writeable;

  constructor(type: number, flags: number, data: Writeable) {
    super();
    this.type = type;
    this.flags = flags;
    this.data = data;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);

    dataview.setUint16(offset, this.type, true);
    dataview.setUint8(offset+4, this.flags);

    let writtenAmount = this.data.write(arrayBuffer, offset + 8);
    writtenAmount = Math.ceil(writtenAmount / 8) * 8; //padding so length is multiple of 8 bytes

    dataview.setUint16(offset+2, writtenAmount, true);
    return 8 + writtenAmount;
  }

  getLength(): number {
    return 8 + Math.ceil(this.data.getLength() / 8) * 8;
  }

  getType(): number {
    return this.type;
  }

  getFlags(): number {
    return this.flags;
  }

  getData(): Writeable {
    return this.data;
  }
}
