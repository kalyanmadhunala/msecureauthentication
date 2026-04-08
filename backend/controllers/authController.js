import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import {
  verifyOTPTemplete,
  verifyResetOTPTemplete,
  welcomeEmailTemplete,
} from "../utils/emailTempletes.js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, msg: "Missing details" });
  }

  try {
    const userexist = await userModel.findOne({ email });

    if (userexist) {
      return res.json({ success: false, msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ name, email, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    //Sending welcome email
    await resend.emails.send({
      from: 'mSecure Auth <onboarding@resend.dev>', // default works
      to: email,
      subject: "Welcome to mSecure Authenticator",
      html: welcomeEmailTemplete(name, email),
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ success: false, msg: "Email and password are required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, msg: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.json({ success: true, msg: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const sendVerifyOTP = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, msg: "Account already verified" });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOTP = otp;
    user.verifyOTPExpireAt = Date.now() + 5 * 60 * 1000;

    await user.save();

    
    //Sending welcome email
    await resend.emails.send({
      from: 'mSecure Auth <onboarding@resend.dev>', // default works
      to: email,
      subject: "Email verification OTP",
      html: verifyOTPTemplete(user.name, otp),
    });

    return res.json({
      success: true,
      msg: "Verification email sent successfully",
    });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;

  if (!userId || !otp) {
    return res.json({ success: false, msg: "Missing details" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    if (user.verifyOTP === "" || user.verifyOTP !== otp) {
      return res.json({ success: false, msg: "Invalid OTP" });
    }

    if (user.verifyOTPExpireAt < Date.now()) {
      user.verifyOTP = "";
      user.verifyOTPExpireAt = 0;
      await user.save();
      return res.json({ success: false, msg: "OTP Expired" });
    }

    user.isAccountVerified = true;
    user.verifyOTP = "";
    user.verifyOTPExpireAt = 0;
    await user.save();

    return res.json({ success: true, msg: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const sendResetOTP = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, msg: "Missing details" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    const resetotp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOTP = resetotp;
    user.resetOTPExpireAt = Date.now() + 5 * 60 * 1000;
    await user.save();

    //Sending reset password verification email
    await resend.emails.send({
      from: 'mSecure Auth <onboarding@resend.dev>', // default works
      to: email,
      subject: "Password reset OTP",
      html: verifyResetOTPTemplete(user.name, resetotp),
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 10 * 60 * 1000,
    });

    res.json({
      success: true,
      msg: "Otp sent to your registered email successfully",
    });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const verifyResetOTP = async (req, res) => {
  const userId = req.user.id;
  const { otp } = req.body;

  if (!otp || otp.length < 6) {
    return res.json({ success: false, msg: "Invalid OTP" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    if (user.resetOTP === "" || user.resetOTP !== otp) {
      return res.json({ success: false, msg: "Invalid OTP" });
    }

    if (user.resetOTPExpireAt < Date.now()) {
      user.resetOTP = "";
      user.resetOTPExpireAt = 0;
      await user.save();
      return res.json({ success: false, msg: "OTP Expired" });
    }

    user.resetOTP = "";
    user.resetOTPExpireAt = 0;
    await user.save();

    return res.json({ success: true, msg: "Email verified successfully" });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const userId = req.user.id;
  const { newpassword } = req.body;

  if (!newpassword) {
    return res.json({ success: false, msg: "Missing details" });
  }

  if (newpassword.length < 8) {
    return res.json({ success: false, msg: "Password must be strong" });
  }

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.json({ success: false, msg: "User doesn't exists" });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    user.password = hashedPassword;
    await user.save();

    return res.json({
      success: true,
      msg: "Your password has been reset successfully",
    });
  } catch (error) {
    return res.json({ success: false, msg: error.message });
  }
};
