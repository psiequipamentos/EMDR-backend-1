import repositories from "../repository/init";
import MasterController from "./master-controllers";

export default class PsicologoControllers extends MasterController{
    constructor(){
        super(new repositories.PsicologoRepository());
    }
}