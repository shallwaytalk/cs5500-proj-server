import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: smtp.gmail.com,
      service: "gmail",
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: "exercisemaster999@gmail.com",
        pass: "jqusfxnmbmzeqntw",
      },
    });

    await transporter.sendMail({
      from: "exercisemaster999@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
