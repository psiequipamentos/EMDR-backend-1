import controllers from "../../controllers/init";
import MasterRoutes from "../master-routes";

export default class PacienteRoutes extends MasterRoutes {
  constructor() {
    super(new controllers.PacienteControllers());
    this.endpoint = '/paciente';
  }

}
