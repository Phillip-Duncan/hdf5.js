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

  const datagroup2 = new DataGroup("cats");

  const dataset5 = new Dataset("catslikemilk", [-10, 11, 12, 13, 14, 15, 16, 17, 18], [1, 3, 3], Datatype.FLOAT64);
  datagroup2.addDataset(dataset5);

  const dataset6 = new Dataset("numlegs", [4], [1, 1], Datatype.FLOAT64);
  datagroup2.addDataset(dataset6);

  const datagroups = [datagroup, datagroup2];

  const hdf5_exporter = new HDF5ExportFile(datagroups);
  const arrayBuffer = hdf5_exporter.write();
  return arrayBuffer;
}

export_hdf5();
