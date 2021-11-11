import * as express from "express";
import { json } from "body-parser";
import * as cors from "cors";

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

export default app;
