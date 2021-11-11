import models from "../models/init"

import AuthenticableEntities from "./authenticable-entities";

class AdmRepository extends AuthenticableEntities {
  constructor() {
    super(models.Administrador);
  }
}

export default AdmRepository;
