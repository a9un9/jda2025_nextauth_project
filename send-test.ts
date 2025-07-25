import nodemailer from "nodemailer";

(async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "agunghutri@gmail.com",
      pass: "nikoycnrzueoaydq", // Ganti dengan Gmail App Password
    },
  });

  const info = await transporter.sendMail({
    from: '"Admin JDA" <agunghutri@gmail.com>',
    to: "agunghutri@gmail.com", // bisa diganti ke email lain
    subject: "Test Email dari Nodemailer",
    text: "Ini hanya email test dari skrip manual",
  });

  console.log("Email berhasil dikirim:", info.response);
})();
