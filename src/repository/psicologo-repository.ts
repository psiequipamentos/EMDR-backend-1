import models from '../models/init'
import MasterRepository from './master-repository'

export default class PsicologoRepository extends MasterRepository {

    constructor(){
        super(models.Psicologo);
    }

}