const path = require("path");
const fs = require("fs");
const basename = path.basename(__filename);

let repositories: any = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const repository = require(path.join(__dirname, file));
    repositories[repository.default.name] = repository.default;
  });

export default repositories;
