import * as express from "express";
import { json } from "body-parser";
import * as cors from "cors";
import DailyRoutes from "./services/daily.co/daily.routes";

const app = express();

import routes from "./routes/routes";
import path = require("path");

app.use(cors());
app.use(json());

// * Alunos files
app.use(
  "/files/alunos/perfil",
  express.static(path.join(__dirname, "../public/uploads/alunos/perfil"))
);

Object.keys(routes).forEach((route) =>
  app.use(routes[route]["endpoint"], routes[route]["router"])
);
const daily_routes: DailyRoutes = new DailyRoutes();
app.use("/daily", daily_routes.router);
export default app;
