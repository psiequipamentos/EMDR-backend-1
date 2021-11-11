
import models from "../models/init";

import AuthenticableEntities from "./authenticable-entities";

export default class AlunoRepository extends AuthenticableEntities {
  constructor() {
    super(models.Alunos);
    this.relations = []
  }
}
