const Item = require("./item");

class Order {
  constructor(
    { id, store, date, seller, amount, tracking, status, items } = {}
  ) {
    this.id = id;
    this.store = store;
    this.date = date;
    this.seller = seller;
    this.amount = amount;
    this.tracking = tracking;
    this.status = status;
    if (this.status == null && this.tracking != null) {
      this.status = "On The Way";
    }

    this.items = (items || []).map(Item.parse);
  }

  getTimeAgo() {
    if (this.when == null) {
      return "Missing 'when'";
    }

    const msAgo = new Date() - this.when;
    const daysAgo = Math.floor(msAgo / 1000 / 60 / 60 / 24);

    if (daysAgo === 0) {
      return "today";
    } else if (daysAgo === 1) {
      return "yesterday";
    } else {
      const weeks = Math.floor(daysAgo / 7);
      const days = daysAgo - weeks * 7;

      const values = [];
      if (weeks > 0) {
        values.push(`${weeks}w`);
      }
      if (days > 0) {
        values.push(`${days}d`);
      }

      return values.join(" ") + " ago";
    }
  }
}

module.exports = Order;
