const yaml = require("js-yaml");
const path = require("path");
const utils = require("./utils");
const Order = require("./order");

const DEFAULT_ROOT = path.join(process.env.HOME, ".local/share/pkgs");

class Database {
  constructor(root = DEFAULT_ROOT) {
    this._root = root;
  }

  getOrders() {
    return this._load(path.join(this._root, "orders.yml"));
  }

  getArchived() {
    return this._load(path.join(this._root, "archived.yml"), "Delivered");
  }

  _load(filename, defaultStatus = null) {
    return utils.readFile(filename).then(data => {
      const ordersById = yaml.safeLoad(data);

      return Object.keys(ordersById).map(id => {
        const order = ordersById[id];
        order.id = id;

        if (defaultStatus != null && order.status == null) {
          order.status = defaultStatus;
        }

        return new Order(order);
      });
    });
  }
}

module.exports = Database;
