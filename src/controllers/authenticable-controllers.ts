import MasterController from "./master-controllers";
import { hash } from "bcrypt";
import { Response } from "express";

export default class AuthenticableControllers extends MasterController {
  constructor(repository) {
    super(repository);
  }

  create = async (req, res): Promise<Response> => {
    if (req.body.senha != req.body.confsenha)
      return res.status(400).json({
        created: false,
        message: "O campo senha e o campo confirmar senha devem ser iguais.",
      });

    req.body.senha = await hash(req.body.senha, 10);

    const new_user = await this.repository.create(req.body);

    if (!new_user) return res.status(500).json(new_user);

    res.status(200).json(new_user);
  };

  login = async (req, res): Promise<Response> => {
    const retorno = await this.repository.login(req.body);

    if (!retorno.auth) {
      return res
        .status(200)
        .json(retorno);
    }

    res
      .status(200)
      .json({ auth: true, token: retorno.token, user: retorno.user });
  };
}
