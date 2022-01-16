"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = require("./controllers/inventory");
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const ask = (output) => new Promise((resolve) => {
    rl.question(output, resolve);
});
const inventory = new inventory_1.Inventory();
const addItemMenu = async () => {
    const name = await ask("Name: ");
    const count = await ask("Count: ");
    const price = await ask("Price: ");
    const tag = await ask("Tag (food/clothes/tech): ");
    const newItem = new inventory_1.InventoryItem(name, parseInt(count), parseFloat(price), tag);
    inventory.addItem(newItem);
    console.log("Successfully added item");
};
const editItemMenu = async () => {
    const id = await ask("Id of item to be edited: ");
    const oldItem = inventory.getElementById(id);
    console.log("Introduce the new fields (leave empty if you don't want to modify them)\n");
    const name = await ask("New name: ");
    const count = await ask("New count: ");
    const price = await ask("New price: ");
    const tag = await ask("New tag (food/clothes/tech): ");
    const newItem = oldItem;
    if (name.length > 0)
        newItem.name = name;
    if (count.length > 0)
        newItem.count = parseInt(count);
    if (price.length > 0)
        newItem.price = parseFloat(price);
    if (tag.length > 0)
        newItem.tag = tag;
    inventory.replaceElementById(id, newItem);
    console.log("Successfully edited item");
};
const deleteItemMenu = async () => {
    const id = await ask("Id of item to be deleted: ");
    inventory.deleteItemById(id);
    console.log("Successfully deleted item");
};
const printItems = (items) => {
    items.forEach((item) => {
        console.log("id:", item.id);
        console.log("name:", item.name);
        console.log("tag:", item.tag);
        console.log("count:", item.count);
        console.log("isInStock:", item.count > 0, "\n");
    });
};
const viewAllItemsMenu = () => {
    const items = inventory.getAllItems();
    printItems(items);
};
const filterItemsByTagMenu = async () => {
    const tag = await ask("Introduce the tag you want to filter on (food/clothes/tech): ");
    console.log(`Showing items with tag "${tag}": \n`);
    const items = inventory.getElementsWithTag(tag);
    printItems(items);
};
const filterItemsByStockMenu = () => {
    console.log("Showing items in stock: \n");
    const items = inventory.getElementsInStock();
    printItems(items);
};
const main = async () => {
    while (1) {
        const answer = await ask(`
======Welcome=====

[1] Add an item
[2] Edit an item
[3] Delete an item
[4] View all items
[5] Filter items by tag
[6] Filter items by stock
[7] Exit
`);
        console.clear();
        switch (answer) {
            case "1":
                await addItemMenu();
                break;
            case "2":
                await editItemMenu();
                break;
            case "3":
                await deleteItemMenu();
                break;
            case "4":
                viewAllItemsMenu();
                break;
            case "5":
                await filterItemsByTagMenu();
                break;
            case "6":
                filterItemsByStockMenu();
                break;
            case "7":
                console.log("Goodbye");
                process.exit();
            default:
                console.log("Invalid key");
                break;
        }
        await ask("Press any key to continue...");
        console.clear();
    }
};
main();
//# sourceMappingURL=index.js.map