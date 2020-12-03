import { DataGroup } from "./datagroup.js";
import { SuperBlock } from "./structures/superblock.js";
import { SymbolTable } from "./structures/symboltable.js";

export class HDF5ExportFile {
  datagroup: DataGroup;
  constructor(datagroup: DataGroup) {
    this.datagroup = datagroup;
  }

  write(): ArrayBuffer {
    const overheads = 56 + 40; //superblock + symbol table
    const totalLength = this.datagroup.getTotalLength() + overheads
    + 12 + 8 + 12 + this.datagroup.name.length //headers
        
    const array = new ArrayBuffer(totalLength);

    this.datagroup.writeDatasets(array, overheads);

    const superBlock = new SuperBlock();
    superBlock.setEndOfFileAddress(BigInt(totalLength));
    superBlock.write(array, 0);

    const symbolTable = new SymbolTable();
    symbolTable.setObjectHeaderAddress(BigInt(overheads));
    symbolTable.write(array, 56);
    
    return array;
  }
}
