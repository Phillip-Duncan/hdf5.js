import { SuperBlock } from "./structures/superblock.js";
import { SymbolTable } from "./structures/symboltable.js";
import { DataObject } from "./structures/dataobject.js";

import { LinkMessage } from "./structures/header-messages/linkmessage.js";

import { HDF5ExportFile } from "./hdf5-file.js";
import { DataGroup } from "./datagroup.js";
import { Dataset, Datatype } from "./dataset.js";

export function export_hdf5() {
  /*const superblock = new SuperBlock();
  superblock.setEndOfFileAddress(BigInt("0x69007000710072"));

  const array = new ArrayBuffer(56);
  superblock.write(array, 0);
  console.log(array);*/
  const datagroup = new DataGroup("cheese");

  const dataset = new Dataset("data", [3.5, 2.5], [2], Datatype.FLOAT64);
  datagroup.addDataset(dataset);

  const hdf5_exporter = new HDF5ExportFile(datagroup);
  const arrayBuffer = hdf5_exporter.write();
  return arrayBuffer;
}

export_hdf5();
