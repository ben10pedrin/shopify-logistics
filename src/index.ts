import {
  Inventory,
  InventoryItem,
  InventoryTags,
} from "./controllers/inventory";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (output: string): Promise<string> =>
  new Promise((resolve) => {
    rl.question(output, resolve);
  });

const inventory = new Inventory();

const addItemMenu = async () => {
  const name = await ask("Name: ");
  const count = await ask("Count: ");
  const price = await ask("Price: ");
  const tag: any = await ask("Tag (food/clothes/tech): ");
  const newItem = new InventoryItem(
    name,
    parseInt(count),
    parseFloat(price),
    tag
  );
  inventory.addItem(newItem);
};
const editItemMenu = () => {};
const deleteItemMenu = async () => {
  const id = await ask("Id of item to be deleted: ");
  inventory.deleteItemById(id);
};
const viewAllItemsMenu = () => {
  console.log(JSON.stringify(inventory.getAllItems(), null, 2));
};

const main = async () => {
  const answer = await ask(
    `
  ======Welcome=====
  
  [1] Add an item
  [2] Edit an item
  [3] Delete an item
  [4] View all items
  [5] Exit
  `
  );
  while (1) {
    if (answer === "1") {
      await addItemMenu();
    } else if (answer === "2") {
      editItemMenu();
    } else if (answer === "3") {
      await deleteItemMenu();
    } else if (answer === "4") {
      viewAllItemsMenu();
    } else if (answer === "5") {
      console.log("Goodbye");
      process.exit();
    } else {
      console.log("Invalid key");
    }
  }
};

main();
