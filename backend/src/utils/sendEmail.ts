import nodemailer from 'nodemailer';

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL!,
      pass: process.env.EMAIL_PASSWORD!
    }
  });

  const mailOptions = {
    from: process.env.EMAIL!,
    to: email,
    subject: 'Your OTP for Highway Delite App',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
}
