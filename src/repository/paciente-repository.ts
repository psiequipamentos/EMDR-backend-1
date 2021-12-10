import models from '../models/init'
import MasterRepository from './master-repository'

export default class PacienteRepository extends MasterRepository {

    constructor(){
        super(models.Paciente);
        this.relations = ['pacient_sessions']
    }

}