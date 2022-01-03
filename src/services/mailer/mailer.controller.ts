import { createTransport } from "nodemailer";
import { config } from "dotenv";
import { Request, Response } from "express";
import { v4 } from "uuid";
import PsicologoRepository from "../../repository/psicologo-repository";

config();

export default class MailerController {
  private mailer_transport: any;
  constructor() {
    this.mailer_transport = createTransport({
      host: process.env.MAILER_HOST,
      port: parseInt(process.env.MAILER_PORT),
      secure: false,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
      tls: { rejectUnauthorized: false },
      logger: true,
    });
  }

  public sendMail = async (request: Request, response: Response) => {
    const { to, subject, text } = request.body;
    let mail_response;
    try {
      mail_response = await this.mailer_transport.sendMail({
        from: process.env.MAILER_USER,
        to,
        subject,
        text,
      });
      
      if (mail_response.rejected.length == 0) {
        return response.status(200).send({ error: false });
      }
      return response
        .status(500)
        .send({ error: true, error_message: mail_response });
    } catch (error) {
      console.log(error)
    }

  };

  public sendPasswordCode = async (request: Request, response: Response) => {
    const { email } = request.body;
    const code = v4();
    const psicologo_repository = new PsicologoRepository();

    const psicologo: any = await psicologo_repository.searchForEmail(email);
    if(!psicologo)
        return response.status(200).send({error: true, error_message: 'Nenhum usuário com esse e-mail.'})
    try{
        await psicologo_repository.update(psicologo.id,{codigo_recuperacao:code})
    }catch(err){
        console.log(err)
    }
    request.body.to = email;
    request.body.subject = "Código de recuperação de senha"
    request.body.text = `Seu código de recuperação é: ${code}`
    try {
       console.log( await this.sendMail(request, response))
    } catch (error) {
        console.log(error)
    }
    //return response.sendStatus(200)
  };
}
