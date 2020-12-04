import { HDF5ExportFile } from "./hdf5-file.js";
import { DataGroup } from "./datagroup.js";
import { Dataset, Datatype } from "./dataset.js";

export function export_hdf5() {
  const datagroup = new DataGroup("cheese");

  const dataset = new Dataset("data", [3.5, 2.5], [2], Datatype.FLOAT64);
  datagroup.addDataset(dataset);

  const hdf5_exporter = new HDF5ExportFile(datagroup);
  const arrayBuffer = hdf5_exporter.write();
  return arrayBuffer;
}

export_hdf5();
