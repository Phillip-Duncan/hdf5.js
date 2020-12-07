import { DataObject } from "./structures/dataobject.js";
import { HeaderMessage } from "./structures/headermessage.js";
import { DataspaceMessage } from "./structures/header-messages/dataspacemessage.js";
import { DatatypeMessage } from "./structures/header-messages/datatypemessage.js";
import { DataStorageMessage } from "./structures/header-messages/datastoragemessage.js";
import { DataLayoutMessage } from "./structures/header-messages/datalayoutmessage.js";

export class Dataset {
  name: string;
  data: any[];
  dimensions: number[];
  datatype: Datatype;
  dataObject: DataObject;
  dataLayoutMessage: DataLayoutMessage;
  longestString: number;

  /**
   * Construct a dataset
   * @param name Name of the dataset (e.g. "data")
   * @param data Array of the actual data this represents
   * @param dimensions Array of the size in each dimension. Length of this array represents the number of dimensions
   * @param datatype The type of data from the Datatype enum
   */
  constructor(name: string, data: any[], dimensions: number[], datatype: Datatype) {
    this.name = name;
    this.data = data;
    this.dimensions = dimensions;
    this.datatype = datatype;

    const dataspaceMessageHeader = new DataspaceMessage(this.dimensions);
    const dataspaceMessageHeaderMessage = new HeaderMessage(1, 0, dataspaceMessageHeader);

    const datatypeMessageHeader = new DatatypeMessage(this.datatype);
    const datatypeMessageHeaderMessage = new HeaderMessage(3, 1, datatypeMessageHeader);

    const datastorageMessageHeaderMessage = new HeaderMessage(0x05, 1, new DataStorageMessage());

    this.dataLayoutMessage = new DataLayoutMessage();
    const dataLayoutMessageHeader = new HeaderMessage(0x08, 0, this.dataLayoutMessage);

    this.dataObject = new DataObject([dataspaceMessageHeaderMessage, 
      datatypeMessageHeaderMessage, datastorageMessageHeaderMessage,
      dataLayoutMessageHeader]);


    //check array dimensions
    let productOfDimensions = 1;
    for (let i = 0; i < dimensions.length; i++) {
      productOfDimensions *= dimensions[i];
    }
    if (productOfDimensions != data.length) {
      throw "Inconsistent data length with dimensions for dataset '"+name+"'";
    }

    if (this.datatype == Datatype.STRING) {
      this.longestString = 0;
      for (const value of this.data as string[]) {
        this.longestString = Math.max(value.length, this.longestString);
      }
      datatypeMessageHeader.setLongestString(this.longestString);
    }
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataOffset = offset + this.dataObject.getLength();
    this.dataLayoutMessage.setOffsetToData(BigInt(dataOffset));
    const dataLength = this.getLengthOfRawData();
    this.dataLayoutMessage.setDataSize(BigInt(dataLength));

    let dataObjectLength = this.dataObject.write(arrayBuffer, offset);
    return this.writeRawData(arrayBuffer, offset+this.dataObject.getLength()) + dataObjectLength;
  }

  writeRawData(arrayBuffer: ArrayBuffer, offset: number): number {
    const dataView = new DataView(arrayBuffer);
    let offset2 = 0;
    for (const object of this.data) {
      offset2 += this._writeOneRawData(dataView, offset + offset2, object);
    }
    return Math.ceil(offset2 / 8) * 8; //padding so next headers align with 8 bytes
  }

  _writeOneRawData(dataView: DataView, offset: number, rawdata: any): number {
    switch (this.datatype) {
      case Datatype.INT8:
        dataView.setInt8(offset, rawdata);
        return 1;
      case Datatype.UINT8:
        dataView.setUint8(offset, rawdata);
        return 1;
      case Datatype.INT16:
        dataView.setInt16(offset, rawdata, true);
        return 2;
      case Datatype.UINT16:
        dataView.setUint16(offset, rawdata, true);
        return 2;
      case Datatype.INT32:
        dataView.setInt32(offset, rawdata, true);
        return 4;
      case Datatype.UINT32:
        dataView.setUint32(offset, rawdata, true);
        return 4;
      case Datatype.INT64:
        dataView.setBigInt64(offset, rawdata, true);
        return 8;
      case Datatype.UINT64:
        dataView.setBigUint64(offset, rawdata, true);
        return 8;
      case Datatype.FLOAT64:
        dataView.setFloat64(offset, rawdata, true);
        return 8;
      case Datatype.STRING:
        for (let i = 0; i < (rawdata as string).length; i++) {
          dataView.setUint8(offset + i, (rawdata as string).charCodeAt(i));
        }
        return this.longestString + 1;
      default:
        return 0;
    }
  }

  getLength(): number {
    return this.getLengthOfRawData() + this.dataObject.getLength();
  }

  getLengthOfRawData(): number {
    return Math.ceil(this.getRealLengthOfRawData() / 8) * 8;
  }

  getRealLengthOfRawData(): number {
    switch (this.datatype) {
      case Datatype.INT8:
      case Datatype.UINT8:
        return this.data.length;
      case Datatype.INT16:
      case Datatype.UINT16:
        return this.data.length * 2;
      case Datatype.INT32:
      case Datatype.UINT32:
        return this.data.length * 4;
      case Datatype.INT64:
      case Datatype.UINT64:
      case Datatype.FLOAT64:
        return this.data.length * 8;
      default:
        break;
    }
    if (this.datatype == Datatype.STRING) {
      return this.data.length * (this.longestString+1);
    } else {
      return 0;
    }
  }
}

export enum Datatype {
  INT8,
  UINT8,
  INT16,
  UINT16,
  INT32,
  UINT32,
  INT64,
  UINT64,
  FLOAT64,
  STRING
}
