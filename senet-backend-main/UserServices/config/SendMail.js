import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const SendMail = async (email, subject, body) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const MailResponce = await transport.sendMail({
      from: `SENET`,
      to: `${email}`,
      subject: `${subject}`,
      html: `${body}`,
    });
    console.log("Mail send successfully");
    return MailResponce;
  } catch (error) {
    console.log(
      "This is a error accouring while sending the mail by verification",
      error.message
    );
    throw error
  }
};

export default SendMail;