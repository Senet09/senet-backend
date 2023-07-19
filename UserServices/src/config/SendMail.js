import nodemailer from "nodemailer";

const SendMail = async (email, subject, body) => {
  try {
    const transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const mailResponse = await transport.sendMail({
      from: process.env.MAIL_USER,
      to: `${email}`,
      subject: `${subject}`,
      html: `${body}`,
    });
    console.log("Mail send successfully");
    return mailResponse;
  } catch (error) {
    console.log(
      "This is a error occuring while sending the mail by verification",
      error.message
    );
    throw error;
  }
};

export default SendMail;
