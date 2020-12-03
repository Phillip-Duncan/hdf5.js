import { Writeable } from "./writeable.js";
import { HeaderMessage } from "./headermessage.js";

export class DataObject extends Writeable {
  headers: HeaderMessage[];

  constructor(headers: HeaderMessage[]) {
    super();
    this.headers = headers;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataview = new DataView(arrayBuffer);
    dataview.setUint8(offset, 1); //version

    dataview.setUint16(offset+2, this.headers.length, true); //number of header messages
    dataview.setUint32(offset+4, 1, true); //object reference count

    let length = 12;
    while ((offset + length) % 8 != 0) {
      //padding to align to 8-byte boundaries
      length++;
    }
    let headersLength = 0;
    for (const header of this.headers) {
      const writtenSize = header.write(arrayBuffer, offset + length);
      length += writtenSize;
      headersLength += writtenSize;
      while ((offset + length) % 8 != 0) {
        //padding to align to 8-byte boundaries
        length++;
        headersLength++;
      }
    }

    dataview.setUint32(offset+8, headersLength, true); //object header size
    return length;
  }

  getLength(): number {
    let total = 16; //assume 4 padding
    for (const header of this.headers) {
      total += header.getLength();
    }
    return total;
  }
}
