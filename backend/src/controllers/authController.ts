import { Request, Response } from 'express';
import User from '../models/User';
import { generateOtp } from '../utils/generateOtp';
import { sendOtpEmail } from '../utils/sendEmail';
import jwt from 'jsonwebtoken';

export const sendOtp = async (req: Request, res: Response) => {
  const { email } = req.body;
  const otp = generateOtp();

  try {
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, otp });
    } else {
      user.otp = otp;
    }

    await user.save();
    await sendOtpEmail(email, otp);
    res.status(200).json({ message: 'OTP sent to email' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp) {
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    user.otp = ''; // clear OTP
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: '1h'
    });

    res.json({ token, user: { email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};
