import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmail(to: string, otp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM!,
    to,
    subject: "Your OTP Code",
    text: `Your OTP is: ${otp}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("OTP email sent:", info.response); // 👈 log keberhasilan
  } catch (error) {
    console.error("Failed to send OTP email:", error); // 👈 log error
  }
}

export async function POST(req: Request) {
  const { email } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const otp = generateOTP();

  await prisma.user.update({
    where: { email },
    data: { otp },
  });

  await sendEmail(email, otp);

  return NextResponse.json({ message: "OTP sent" });
}