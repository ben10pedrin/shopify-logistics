"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = exports.InventoryItem = void 0;
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class InventoryItem {
    constructor(name, count, price, tag) {
        this.id = (0, uuid_1.v4)();
        this.name = name;
        this.tag = tag;
        this.count = count;
        this.price = price;
    }
}
exports.InventoryItem = InventoryItem;
class Inventory {
    constructor() {
        this.path = "./data/inventory_data.json";
        this.items = [];
        this.read();
    }
    read() {
        const raw = fs_1.default.readFileSync(this.path, "utf8");
        this.items = JSON.parse(raw);
    }
    write() {
        const raw = JSON.stringify(this.items, null, 2);
        fs_1.default.writeFileSync(this.path, raw, { encoding: "utf8" });
    }
    addItem(item) {
        this.items.push(item);
        this.write();
    }
    deleteItemById(id) {
        this.items = this.items.filter((item) => item.id !== id);
        this.write();
    }
    getAllItems() {
        return this.items;
    }
    getElementById(id) {
        const result = this.items.filter((item) => item.id === id);
        if (result.length === 0)
            return null;
        return result[0];
    }
    replaceElementById(id, newItem) {
        this.items = this.items.map((item) => {
            if (item.id === id) {
                newItem.id = id;
                return newItem;
            }
            return item;
        });
        this.write();
    }
    getElementsWithTag(tag) {
        return this.items.filter((item) => item.tag === tag);
    }
    getElementsInStock() {
        return this.items.filter((item) => item.count > 0);
    }
}
exports.Inventory = Inventory;
//# sourceMappingURL=inventory.js.map