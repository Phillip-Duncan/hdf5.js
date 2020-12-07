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

  const datagroupDatatypes = new DataGroup("datatype-tests");

  const datasetDatatypeInt8 = new Dataset("int8", [0, 1, -128, -127, 127, 128, 129, 255, 256], [1, 9], Datatype.INT8);
  datagroupDatatypes.addDataset(datasetDatatypeInt8);

  const datasetDatatypeUInt8 = new Dataset("uint8", [0, 1, -128, -127, 127, 128, 129, 255, 256], [1, 9], Datatype.UINT8);
  datagroupDatatypes.addDataset(datasetDatatypeUInt8);

  const datasetDatatypeInt16 = new Dataset("int16", [0, 1, 32767, -32767, 32768, -32768, 65536, 65535], [1, 8], Datatype.INT16);
  datagroupDatatypes.addDataset(datasetDatatypeInt16);

  const datasetDatatypeUInt16 = new Dataset("uint16", [0, 1, 32767, -32767, 32768, -32768, 65536, 65535], [1, 8], Datatype.UINT16);
  datagroupDatatypes.addDataset(datasetDatatypeUInt16);

  const datasetDatatypeString = new Dataset("string", ["hello", "world", "I", "am", "Alex", "How are you?"], [2, 3], Datatype.STRING);
  datagroupDatatypes.addDataset(datasetDatatypeString);
  const datagroups = [datagroup, datagroup2, datagroupDatatypes];

  const hdf5_exporter = new HDF5ExportFile(datagroups);
  const arrayBuffer = hdf5_exporter.write();
  return arrayBuffer;
}

export_hdf5();
