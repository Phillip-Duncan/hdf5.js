export abstract class Writeable {
  /**
   * Writes the Writeable instance to the given array buffer at the given offset, then returns the number of bytes that were written
   * @param arrayBuffer ArrayBuffer to write to
   * @param offset Offset (in bytes) to write to the arraybuffer
   * @returns number of bytes that should be allocated after writing this object
   */
  abstract write(arrayBuffer: ArrayBuffer, offset: number): number;

  /**
   * Gets the amount of space in bytes needed to write this instance of Writeable to an arraybuffer
   * @returns length in bytes
   */
  abstract getLength(): number;
}
