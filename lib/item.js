class Item {
  constructor({ id, title, img, url, cost, quantity } = {}) {
    this.id = id;
    this.title = title;
    this.img = img;
    this.url = url;
    this.cost = cost;
    this.quantity = quantity;
  }

  static parse(raw) {
    if (raw instanceof Item) return raw;
    return new Item(raw);
  }
}

module.exports = Item;
