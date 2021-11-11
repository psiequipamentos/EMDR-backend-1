import controllers from "../../controllers/init";
import MasterRoutes from "../master-routes";

/**
 * *  ADMIN ROUTES
 * * /admin
 */

export default class AdminRoutes extends MasterRoutes {
  endpoint: string;
  constructor() {
    super(new controllers.AdmController());
    this.endpoint = "/admin";

    this.endpoints["login"] = {
      login: {
        endpoint: this.router.post("/login", this.controller.login),
      },
    };
  }
}
