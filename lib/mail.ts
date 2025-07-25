import nodemailer from "nodemailer";

export async function sendEmailOTP(email: string, otp: string) {
  console.log("📨 Preparing to send OTP:", otp, "to", email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Kode OTP Anda",
    text: `Kode OTP Anda adalah: ${otp}`,
    html: `<p>Kode OTP Anda adalah: <b>${otp}</b></p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.response);
  } catch (error) {
    console.error("Failed to send OTP email:", error);
  }
}

