import { getRepository } from "typeorm";
import models from "../models/init";
import MasterRepository from "./master-repository";

export default class SessionRepository extends MasterRepository {
  constructor() {
    super(models.Sessions);
    this.relations = ['psicologo','paciente']
  }

  readOneBySessionId = async (session_id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      const repo = getRepository(this.model, "default");

      repo
        .findOne({ session_id ,relations:this.relations})
        .then((data) => resolve(data))
        .catch((read_one_by_session_id_error) =>
          reject(read_one_by_session_id_error.error)
        );
    });
  };
}
