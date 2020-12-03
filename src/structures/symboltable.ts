import { Writeable } from "./writeable.js";

export class SymbolTable extends Writeable {
  objectHeaderAddress = BigInt(0) as bigint;

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setBigUint64(offset, BigInt("0"), true);
    dataview.setBigUint64(offset+8, this.objectHeaderAddress, true);

    return 40;
  }

  getLength(): number {
    return 40;
  }

  getObjectHeaderAddress() {
    return this.objectHeaderAddress;
  }

  setObjectHeaderAddress(objectHeaderAddress: bigint) {
    this.objectHeaderAddress = objectHeaderAddress;
  }
}
