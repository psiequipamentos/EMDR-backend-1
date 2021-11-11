import repositories from "../repository/init";

import AuthenticableControllers from "./authenticable-controllers";

export default class AdmController extends AuthenticableControllers {
  constructor() {
    super(new repositories.AdmRepository());
  }
}
