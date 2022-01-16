# Shopify inventory system

## Stack

Node + Typescript + UUID package

## Features

The client has a menu where you can select from the following options:

```
======Welcome=====

[1] Add an item
[2] Edit an item
[3] Delete an item
[4] View all items
[5] Filter items by tag
[6] Filter items by stock
[7] Exit
```

The InventoryItem structure is the following:

```typescript
export class InventoryItem {
  id: string;
  name: string;
  count: number;
  price: number;
  tag: "food" | "clothes" | "tech";
}
```

## How does it works?

Internally, there are 4 folders.

- The `data` folder contains a JSON file where all the inventory is stored.
- The `dist` folder contains the compiled javascript.
- The `src` folder contains the source code in typescript.
- The `src/controllers` folder contains the inventory class.

## How to run it?

Make sure you have `node` and `npm` installed

Just run

```bash
npm start
```

If you want to run the source code you will have to:

```bash
npm install
npm run dev
```

Note: make sure you are carefull with typos, string validation and error handling were omitted for simplicity sake

> Tested on node v17.3.0 and npm 8.3.0
