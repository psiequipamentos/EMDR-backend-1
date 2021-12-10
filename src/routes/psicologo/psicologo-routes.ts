import controllers from "../../controllers/init";
import AuthenticableRoutes from "../authenticable-routes";

export default class PsicologoRoutes extends AuthenticableRoutes {
  constructor() {
    super(new controllers.PsicologoControllers());
    this.endpoint = '/psicologo';
  }

}