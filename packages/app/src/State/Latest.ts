export class Latest<T> {
  item: T;
  version: number;

  constructor(i: T, v: number) {
    this.item = i;
    this.version = v;
  }

  /**
   * Try to update the item with a newer version
   */
  update(newItem: T, version: number) {
    if (this.version < version) {
      this.item = newItem;
      this.version = version;
    }
  }
}
