class Package {
  constructor(name, store, { when, tracking, status }) {
    this.name = name;
    this.store = store;
    this.when = when;
    this.tracking = tracking;
    this.status = status;

    if (this.status == null && this.tracking != null) {
      this.status = "On The Way";
    }

    if (when == null) {
      console.warn(`WARNING: Package "${name}" is missing "when"`);
    }
  }

  addToTable(table) {
    table.cell("Name", this.name);
    table.cell("Order date", this.getTimeAgo());
    if (this.tracking != null) {
      table.cell("Tracking#", this.tracking);
    }
    table.newRow();
  }

  getTimeAgo() {
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

module.exports = Package;
