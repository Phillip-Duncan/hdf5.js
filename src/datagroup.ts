import { Dataset } from "./dataset.js";
import { DataObject } from "./structures/dataobject.js";
import { LinkMessage } from "./structures/header-messages/linkmessage.js";
import { LinkInfoMessage } from "./structures/header-messages/linkinfomessage.js";
import { GroupInfoMessage } from "./structures/header-messages/groupinfomessage.js";
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
      //24 for 0x0002 and 0x000A
      //24 for dataobject and 0x0006
    let totalLength = 96 + Math.ceil((12 + this.name.length) / 8) * 8;
    for (const dataset of this.datasets) {
      totalLength += dataset.getLength();
      totalLength += 48 + Math.ceil((12 + dataset.name.length) / 8) * 8;
    }
    return totalLength;
  }

  write(arrayBuffer: ArrayBuffer, offset: number): number {
    const linkInfoHeader = new HeaderMessage(2, 0, new LinkInfoMessage());
    const groupInfoHeader = new HeaderMessage(0x0A, 0, new GroupInfoMessage());

    const linkMessage = new LinkMessage(this.name, BigInt(0));
    const linkMessageHeader = new HeaderMessage(6, 1, linkMessage);

    const groupDataObject = new DataObject([linkInfoHeader, groupInfoHeader, linkMessageHeader]);
    const length = groupDataObject.getLength();
    linkMessage.setAddress(BigInt(offset + length));
    const realLength = groupDataObject.write(arrayBuffer, offset);
    if (length != realLength) {
      throw "Predicted length for datagroup headers != real length";
    }
    const dataLength = this.writeDatasets(arrayBuffer, offset + realLength);
    return realLength + dataLength;
  }

  writeDatasets(arrayBuffer: ArrayBuffer, offset: number): number {
    const linkInfoHeader = new HeaderMessage(2, 0, new LinkInfoMessage());
    const groupInfoHeader = new HeaderMessage(0x0A, 0, new GroupInfoMessage());

    const linkMessages = [] as { dataset: Dataset; linkMessage: LinkMessage }[];
    const headers = [linkInfoHeader, groupInfoHeader] as HeaderMessage[];
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
