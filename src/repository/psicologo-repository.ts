import { getRepository } from 'typeorm';
import models from '../models/init'
import AuthenticableEntities from './authenticable-entities';


export default class PsicologoRepository extends AuthenticableEntities {

    constructor(){
        super(models.Psicologo);
    }
}