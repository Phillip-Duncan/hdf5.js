import { Writeable } from "./../writeable.js";

export class LinkInfoMessage extends Writeable {
  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 0); //version
    dataview.setUint8(offset + 1, 0); //flags
    dataview.setBigUint64(offset + 2, BigInt("0xFFFFFFFFFFFFFFFF"));
    dataview.setBigUint64(offset + 10, BigInt("0xFFFFFFFFFFFFFFFF"));
    return 18;
  }

  getLength(): number {
    return 18;
  }
}
