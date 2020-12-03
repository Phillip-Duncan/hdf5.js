import { Writeable } from "./../writeable.js";

export class LinkMessage extends Writeable {
  name: string;
  address: bigint;

  constructor(name: string, address: bigint) {
    super();
    this.name = name;
    this.address = address;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 1); //version
    dataview.setUint8(offset + 1, 0b00010000); //flags: link name 1b, link name character set
    dataview.setUint8(offset + 2, 1); //utf-8
    dataview.setUint8(offset + 3, this.name.length); //name length (1 byte)
    for (let i = 0; i < this.name.length; i++) {
      dataview.setUint8(offset + 4 + i, this.name.charCodeAt(i));
    }
    dataview.setBigUint64(offset + 4 + this.name.length, this.address, true);

    return 12 + this.name.length;
  }

  setAddress(address: bigint) {
    this.address = address;
  }

  getLength(): number {
    return 12 + this.name.length;
  }
}
