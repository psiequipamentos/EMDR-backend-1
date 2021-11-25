import controllers from "../controllers/init";
import MasterRoutes from "./master-routes";

export default class SessionRoutes extends MasterRoutes {
  constructor() {
    super(new controllers.SessionController());
    this.endpoint = '/session';
  }

}
