import * as express from "express";
import { json } from "body-parser";
import * as cors from "cors";
import DailyRoutes from "./services/daily.co/daily.routes";

const app = express();

import routes from "./routes/routes";
import path = require("path");
import AuthControllers from "./controllers/auth-controllers";
import TwilioRoutes from "./services/twilio/twilio.routes";
import MailerRoutes from "./services/mailer/mailer.routes";

app.use(cors());
app.use(json());

// * Alunos files


Object.keys(routes).forEach((route) =>
  app.use(routes[route]["endpoint"], routes[route]["router"])
);
const daily_routes: DailyRoutes = new DailyRoutes();
app.use("/daily", daily_routes.router);

const twilio_routes: TwilioRoutes = new TwilioRoutes();
app.use('/twilio', twilio_routes.router);

const mailer_routes: MailerRoutes = new MailerRoutes()
app.use('/mailer', mailer_routes.router)

const auth_controllers = new AuthControllers()
app.post('/auth/token',auth_controllers.verifyToken)
app.post('/auth/token/data',auth_controllers.getTokenData)

export default app;
