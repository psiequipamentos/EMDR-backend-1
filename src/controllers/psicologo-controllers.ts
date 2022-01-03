import repositories from "../repository/init";
import AuthenticableControllers from "./authenticable-controllers";
import { hash } from "bcrypt";

export default class PsicologoControllers extends AuthenticableControllers {
  constructor() {
    super(new repositories.PsicologoRepository());
  }
  public verificarCodigo = async (req, res) => {
    const { code } = req.body;

    const psicologo = await this.repository.searchForCode(code);
    console.log(code);
    if (!psicologo)
      return res
        .status(200)
        .send({ error: true, error_message: "Código incorreto" });

    return res.status(200).send({ error: false, psicologo });
  };

  public recuperarSenha = async (req, res) => {
    const { id, senha } = req.body;

    const password =await hash(senha, 10);
    console.log(password)
    const password_update = await this.repository.update(id, { senha:password });
    console.log(password_update);
    return res.sendStatus(200);
  };
}
