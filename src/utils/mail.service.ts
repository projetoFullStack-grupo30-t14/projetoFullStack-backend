import { MailerService } from '@nestjs-modules/mailer';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SendEmailDto } from 'src/modules/users/dto/send-email.dto';
import * as Mailgen from 'mailgen';

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Motor-Shop',
    link: 'https://localhost:3000',
  },
});

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail({ to, subject, text }: SendEmailDto) {
    await this.mailerService
      .sendMail({
        to,
        subject,
        html: text,
      })
      .then(() => {
        console.log('Email enviado com sucesso');
      })
      .catch((err) => {
        console.log(err);
        throw new InternalServerErrorException(
          'Error ao enviar o email, tente novamente mais tarde',
        );
      });
  }

  resetPasswordTemplate(
    userEmail: string,
    userName: string,
    resetToken: string,
  ) {
    const email = {
      body: {
        name: userName,
        intro:
          'Você recebeu este email porque solicitou uma nova senha para a sua conta no Motor-shop.',
        action: {
          instructions: 'Clique no botão abaixo para restaurar a sua senha:',
          button: {
            color: '#4529E6',
            text: 'Restaure a sua senha',
            link: `http://localhost:3000/resetPassword/${resetToken}`,
          },
        },
        outro:
          'Se você não solicitou uma nova senha, nenhuma ação será necessária',
      },
    };
    const emailBody = mailGenerator.generate(email);
    const emailTemplate = {
      to: userEmail,
      subject: 'Reset Password Motor-shop',
      text: emailBody,
    };

    return emailTemplate;
  }
}
