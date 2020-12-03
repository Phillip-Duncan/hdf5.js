import { Dataset } from "./dataset.js";
import { DataObject } from "./structures/dataobject.js";
import { LinkMessage } from "./structures/header-messages/linkmessage.js";
import { HeaderMessage } from "./structures/headermessage.js";

export class DataGroup {
  name: string;
  datasets: Dataset[];

  constructor(name: string) {
    this.name = name;
    this.datasets = [];
  }

  addDataset(dataset: Dataset) {
    this.datasets.push(dataset);
  }

  getDatasets(): Dataset[] {
    return this.datasets;
  }

  getTotalLength(): number {
    let totalLength = 0;
    for (const dataset of this.datasets) {
      totalLength += dataset.getLength();
    }
    return totalLength;
  }

  writeDatasets(arrayBuffer: ArrayBuffer, offset: number): number {
    const linkMessages = [] as { dataset: Dataset; linkMessage: LinkMessage }[];
    const headers = [] as HeaderMessage[];
    for (const dataset of this.datasets) {
      const linkMessage = new LinkMessage(dataset.name, BigInt(0));
      const message = new HeaderMessage(6, 1, linkMessage);
      linkMessages.push({ dataset, linkMessage });
      headers.push(message);
    }

    const masterDataObject = new DataObject(headers);
    let runningOffset = offset + masterDataObject.getLength();
    for (const dataset of this.datasets) {
      const dataOffset = runningOffset;
      const length = dataset.write(arrayBuffer, dataOffset);
      runningOffset += length;
      for (const obj of linkMessages) {
        if (obj.dataset == dataset) {
          obj.linkMessage.setAddress(BigInt(dataOffset));
          break;
        }
      }
    }

    masterDataObject.write(arrayBuffer, offset);
    return runningOffset - offset;
  }
}
