import { HDF5ExportFile } from "./hdf5-file.js";
import { DataGroup } from "./datagroup.js";
import { Dataset, Datatype } from "./dataset.js";

export function export_hdf5() {
  const datagroup = new DataGroup("cheese");

  const dataset = new Dataset("data", [3.5, 2.5], [1, 2], Datatype.FLOAT64);
  datagroup.addDataset(dataset);

  const dataset2 = new Dataset("quality", [10.5, 0.1234, 987654321, 10.6], [2, 2], Datatype.FLOAT64);
  datagroup.addDataset(dataset2);

  const dataset3 = new Dataset("flavour", [10], [1], Datatype.FLOAT64);
  datagroup.addDataset(dataset3);

  const dataset4 = new Dataset("hardness", [10], [1, 1], Datatype.FLOAT64);
  datagroup.addDataset(dataset4);

  const hdf5_exporter = new HDF5ExportFile(datagroup);
  const arrayBuffer = hdf5_exporter.write();
  return arrayBuffer;
}

export_hdf5();
