import { Writeable } from "./../writeable.js";

export class DataspaceMessage extends Writeable {
  dimensionSizes: number[];

  constructor(dimensionSizes: number[]) {
    super();
    this.dimensionSizes = dimensionSizes;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 1);
    dataview.setUint8(offset+1, this.dimensionSizes.length);
    dataview.setUint8(offset+2, 1);
    for (let dimensionId = 0; dimensionId < this.dimensionSizes.length; dimensionId++) {
        dataview.setBigUint64(offset+8+(dimensionId * 8), BigInt(this.dimensionSizes[dimensionId]), true);
        dataview.setBigUint64(offset+8+(this.dimensionSizes.length*8)+(dimensionId * 8), BigInt(this.dimensionSizes[dimensionId]), true);
    }
    return 8 + 16 * this.dimensionSizes.length;
  }

  getLength(): number {
    return 8 + 16 * this.dimensionSizes.length;
  }
}
