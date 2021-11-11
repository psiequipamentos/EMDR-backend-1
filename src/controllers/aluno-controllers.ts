import repositories from "../repository/init";
import AuthenticableControllers from "./authenticable-controllers";

export default class AlunoController extends AuthenticableControllers {
  constructor() {
    super(new repositories.AlunoRepository());
    this.request_fields = [
      "nome_completo",
      "email",
      "telefone",
      "cpf",
      "endereco",
      "senha",
    ];
  }
}
