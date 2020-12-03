import { Writeable } from "./writeable.js";

export class SuperBlock extends Writeable {
  endOfFileAddress = BigInt(0) as bigint;

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setBigUint64(offset, BigInt("0x894844460d0a1a0a"), false);

    dataview.setUint16(offset + 13, 0x0808); //size of offsets & lengths: 8b, 8b
    dataview.setUint16(offset + 16, 0x04, true); //group leaf node
    dataview.setUint16(offset + 18, 0x10, true); //group internal node

    dataview.setBigUint64(offset + 32, BigInt("0xFFFFFFFFFFFFFFFF"), true);
    dataview.setBigUint64(offset + 40, this.endOfFileAddress, true);
    dataview.setBigUint64(offset + 48, BigInt("0xFFFFFFFFFFFFFFFF"), true);
    
    return 56;
  }

  getLength(): number {
    return 56;
  }

  setEndOfFileAddress(endOfFileAddress: bigint) {
    this.endOfFileAddress = endOfFileAddress;
  }

  getEndOfFileAddress(): bigint {
    return this.endOfFileAddress;
  }
}
