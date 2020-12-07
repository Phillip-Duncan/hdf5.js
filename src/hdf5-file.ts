import { DataGroup } from "./datagroup.js";
import { DataObject } from "./structures/dataobject.js";
import { SuperBlock } from "./structures/superblock.js";
import { SymbolTable } from "./structures/symboltable.js";

export class HDF5ExportFile {
  datagroups: DataGroup[];
  constructor(datagroups: DataGroup[]) {
    this.datagroups = datagroups;
  }

  write(): ArrayBuffer {
    let initialOverheads = 56 + 40; //superblock + symbol table + data object
    let overheads = initialOverheads + 16; 
    let totalLength = overheads;
    for (const datagroup of this.datagroups) {
      totalLength += datagroup.getTotalLength();
      overheads += datagroup.getHeaderLength();
    }
        
    const array = new ArrayBuffer(totalLength);

    let rootHeaders = [];
    let dataOffset = overheads;

    for (const datagroup of this.datagroups) {
      for (const header of datagroup.getHeaders(dataOffset)) {
        rootHeaders.push(header);
      }
      dataOffset += datagroup.writeDatasets(array, dataOffset);
    }

    const groupDataObject = new DataObject(rootHeaders);
    groupDataObject.write(array, initialOverheads);

    const superBlock = new SuperBlock();
    superBlock.setEndOfFileAddress(BigInt(totalLength));
    superBlock.write(array, 0);

    const symbolTable = new SymbolTable();
    symbolTable.setObjectHeaderAddress(BigInt(initialOverheads));
    symbolTable.write(array, 56);
    
    return array;
  }
}
