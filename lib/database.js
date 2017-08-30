const yaml = require("js-yaml");
const path = require("path");
const utils = require("./utils");
const Package = require("./package");

const DEFAULT_ROOT = path.join(process.env.HOME, ".local/share/pkgs");

class Database {
  constructor(root = DEFAULT_ROOT) {
    this._root = root;
  }

  getPending() {
    return this._load(path.join(this._root, "packages.yml"));
  }

  getArrived() {
    return this._load(path.join(this._root, "arrived.yml"));
  }

  _load(filename) {
    return utils.readFile(filename).then(data => {
      const packagesByStore = yaml.safeLoad(data);
      const packages = [];

      Object.keys(packagesByStore).forEach(store => {
        const packagesByName = packagesByStore[store];
        Object.keys(packagesByName).forEach(name => {
          packages.push(new Package(name, store, packagesByName[name]));
        });
      });

      return packages;
    });
  }
}

module.exports = Database;
