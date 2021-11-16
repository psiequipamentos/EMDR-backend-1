import controllers from "../controllers/init";
import MasterRoutes from "./master-routes";

export default class PsicologoRoutes extends MasterRoutes {
  constructor() {
    super(new controllers.PsicologoController());
    this.endpoint = '/psicologo';
  }

}