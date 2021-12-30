import {createTransport} from "nodemailer";
import {config} from "dotenv";
import {Request, Response} from "express";

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
                pass: process.env.MAILER_PASS
            },
            tls: {rejectUnauthorized: false},
            logger: true
        })
    }

    public sendMail = async(request: Request, response:Response) => {
        const {to, subject, text} = request.body;
        const mail_response = await this.mailer_transport.sendMail({
            from: process.env.MAILER_USER,
            to,
            subject,
            text
        })

        if(mail_response.rejected.length == 0){
            return response.status(200).send({error:false})
        }
        return response.status(500).send({error:true, error_message: mail_response})
    }
}