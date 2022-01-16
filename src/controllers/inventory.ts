import fs from "fs";
import { v4 as UUID } from "uuid";

export type InventoryTags = "food" | "clothes" | "tech";

export class InventoryItem {
  id: string;
  name: string;
  count: number;
  price: number;
  tag: InventoryTags;

  constructor(name: string, count: number, price: number, tag: InventoryTags) {
    this.id = UUID();
    this.name = name;
    this.tag = tag;
    this.count = count;
    this.price = price;
  }
}

export class Inventory {
  path = "./data/inventory_data.json";
  items: InventoryItem[] = [];

  constructor() {
    this.read();
  }

  read(): void {
    const raw = fs.readFileSync(this.path, "utf8");
    this.items = JSON.parse(raw);
  }

  write(): void {
    const raw = JSON.stringify(this.items, null, 2);
    fs.writeFileSync(this.path, raw, { encoding: "utf8" });
  }

  addItem(item: InventoryItem): void {
    this.items.push(item);
    this.write();
  }

  deleteItemById(id: string): void {
    this.items = this.items.filter((item) => item.id !== id);
    this.write();
  }

  getAllItems(): InventoryItem[] {
    return this.items;
  }

  getElementById(id: string): InventoryItem | null {
    const result = this.items.filter((item) => item.id === id);
    if (result.length === 0) return null;
    return result[0];
  }

  replaceElementById(id: string, newItem: InventoryItem): void {
    this.items = this.items.map((item) => {
      if (item.id === id) {
        newItem.id = id;
        return newItem;
      }
      return item;
    });
    this.write();
  }

  getElementsWithTag(tag: InventoryTags): InventoryItem[] {
    return this.items.filter((item) => item.tag === tag);
  }

  getElementsInStock(): InventoryItem[] {
    return this.items.filter((item) => item.count > 0);
  }
}
