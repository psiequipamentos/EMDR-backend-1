import repositories from "../repository/init";
import AuthenticableControllers from "./authenticable-controllers";


export default class PsicologoControllers extends AuthenticableControllers{
    constructor(){
        super(new repositories.PsicologoRepository());
    }
}