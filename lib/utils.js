const fs = require("fs");
module.exports = {
  readFile(filename) {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if (err != null) return reject(err);

        return resolve(data);
      });
    });
  }
};
