import repositories from "../repository/init";
import MasterController from "./master-controllers";

export default class PacienteControllers extends MasterController{
    constructor(){
        super(new repositories.PacienteRepository());
    }
}