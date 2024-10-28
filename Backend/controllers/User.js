import Users from "../models/userModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\d\s:]).{1,}$/;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      msg: "Password harus memiliki setidaknya satu huruf besar, satu karakter khusus, dan satu angka.",
    });
  }

  if (password !== confPassword) {
    return res
      .status(400)
      .json({ msg: "Password dan Konfirmasi Password tidak cocok" });
  }

  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({
      where: {
        email: req.body.email,
      },
    });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) return res.status(400).json({ msg: "Wrong Password" });
    const userId = user[0].id;
    const name = user[0].name;
    const email = user[0].email;
    const userRole = user[0].role;

    const accessToken = jwt.sign(
      { userId, name, email, userRole },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3600s",
      }
    );
    await Users.update(
      { refresh_token: accessToken },
      {
        where: {
          id: userId,
        },
      }
    );

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const DeleteUser = async (req, res) => {
  try {
    const response = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (response) {
      await Users.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.json({ msg: "User deleted successfully" });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    // Generate a password reset token
    const token = jwt.sign(
      { email: user.email },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Create a reset link (you should replace 'yourfrontendurl.com' with your actual frontend URL)
    const resetLink = `http://yourfrontendurl.com/reset-password?token=${token}`;

    // Setup email transport
    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your email service provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `Click this link to reset your password: ${resetLink}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ msg: "Link reset password telah dikirim ke email Anda." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};
