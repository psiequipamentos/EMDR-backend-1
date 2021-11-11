const path = require("path");
const fs = require("fs");
const basename = path.basename(__filename);

let routes: any = {};

fs.readdirSync(__dirname).filter((file_path) => {
  if (!(file_path == "api" || file_path == "auth" || file_path == "core" )) {
    const current_path = fs.lstatSync(`${__dirname}/${file_path}`);
    if (current_path.isDirectory())
      fs.readdirSync(`${__dirname}/${file_path}`)
        .filter((router_file) => {
          return (
            router_file.indexOf(".") !== 0 &&
            router_file !== basename &&
            router_file.slice(-3) === ".ts"
          );
        })
        .forEach((file) => {
          const route = require(path.join(`${__dirname}/${file_path}`, file));
          let route_name = route.default().endpoint.replace("/", "");
          if (route_name == "") route_name = "index";
          routes[route_name] = {
            router: route.default().router,
            endpoint: route.default().endpoint,
          };
        });
  }
});

export default routes;
