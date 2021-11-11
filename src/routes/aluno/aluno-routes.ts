import controllers from "../../controllers/init";
import { AuthenticableUploadRoutes } from "../core/core-routes";
import MasterRoutes from "../master-routes";
import UploadRoutes from "../upload-routes";

/**
 * *  ALUNOSROUTES
 * * /aluno
 */

export default class AlunoRoutes extends UploadRoutes {
  endpoint: string;
  constructor() {
    super(new controllers.AlunoController());

    this.endpoint = "/aluno";

    this.endpoints["login"] = {
      login: {
        endpoint: this.router.post("/login", this.controller.login),
      },
    };
  }
}
