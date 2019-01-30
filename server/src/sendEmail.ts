import * as nodemailer from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/sendmail-transport'

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5dece960ce1bfb',
    pass: '7172e59a1cf5b2'
  }
})

export const sendEmail = async (recepient: string, url: string) => {
  let mailOptions: MailOptions = {
    from: 'Linkhub.io',
    to: recepient,
    subject: 'Confirm your email',
    text: 'Confirm your email address',
    html: `<a href="${url}">Confirm your email</a>`
  }

  let info = await transport.sendMail(mailOptions)

  console.log(`Email sent to ${info.envelope.to[0]}`)
}
