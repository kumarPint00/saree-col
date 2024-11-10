const bcrypt = require("bcrypt");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User, sequelize, Sequelize } = require("../models");
const Op = Sequelize.Op;

// Validation helper function
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateMobile = (mobile) => {
  // Convert mobile to string and remove leading '+' if present
  mobile = mobile.toString().replace(/^\+/, "");
  // Remove any non-digit characters
  const digitsOnly = mobile.replace(/\D/g, "");
  // Define country codes for validation
  const countryCodes = [
    "91", // india
    "1", // us
    "44", // "UK"
    "1", // "CA"
    "61", // "AUS"
    "971", // "UAE"
    "39", // "IT"
    "49", // "GER"
    "33", // "FR"
    "32", // "BLG"
    "82", // "SK"
    "81", // "JAP"
  ];
  // Check if the mobile number starts with any of the country codes
  const startsWithCountryCode = countryCodes.some((code) =>
    digitsOnly.startsWith(code),
  );
  // Check if the mobile number has the correct length and starts with a valid country code
  return startsWithCountryCode;
};

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE_PROVIDER,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Create User
exports.create = async (req, res, next) => {
  try {
    const { email, password, userName, firstName, lastName, mobile } = req.body;
    // Validate email and mobile
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validateMobile(mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number format or unavailable country",
      });
    }
    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { mobile }] },
    });
    if (existingUser) {
      return res.status(409).json({
        message: "User with the provided email or mobile already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const t = await sequelize.transaction();
    try {
      // Create user
      const user = await User.create(
        {
          email: email,
          password: hashedPassword,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          mobile: mobile,
          verifiedEmail: false,
          verifiedMobile: false,
          searchableText: email + userName + firstName + lastName + mobile,
        },
        { transaction: t },
      );
      // Send verification email
      const mailToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Account verification email from THC",
        html: `<p>Please click <a href="http://wearthc.com/verify/${mailToken}">here</a> to verify your email address.</p>`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error occurred while sending email:", err);
        } else {
          console.log("Email sent:", info.response);
        }
      });
      // Commit transaction
      await t.commit();
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Find User by ID
exports.findOne = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(user);
    }
  } catch (error) {
    next(error);
  }
};

// Find All Users
exports.findAll = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

// Update User
exports.update = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;
    const { email, mobile } = req.body;
    // Find the user by userId
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Validate email and mobile
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    if (!validateMobile(mobile)) {
      return res.status(400).json({
        message: "Invalid mobile number format or unavailable country",
      });
    }
    // Check if the new email or mobile already exists with another user
    if (email && email !== user.email) {
      const existingEmailUser = await User.findOne({ where: { email } });
      if (existingEmailUser) {
        return res
          .status(409)
          .json({ message: "Email already exists with another user" });
      }
      // ************test and uncomment*************
      // else {
      //   updatedUserData.verifiedEmail = false;
      // }
    }
    if (mobile && mobile !== user.mobile) {
      const existingMobileUser = await User.findOne({ where: { mobile } });
      if (existingMobileUser) {
        return res
          .status(409)
          .json({ message: "Mobile number already exists with another user" });
      }
    }
    // Start transaction
    const t = await sequelize.transaction();
    try {
      const [updatedRowsCount] = await User.update(updatedUserData, {
        where: { id: userId },
        returning: true,
        transaction: t,
      });
      if (updatedRowsCount === 0) {
        res.status(400).json({ message: "User not found" });
      }
      if (email && email !== user.email) {
        const mailToken = jwt.sign(
          { userId: user.id },
          process.env.SECRET_KEY,
          {
            expiresIn: "1h",
          },
        );
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Account verification email from THC",
          html: `<p>Please click <a href="http://wearthc.com/verify/${mailToken}">here</a> to verify your email address.</p>`,
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.error("Error occurred while sending email:", err);
            res
              .status(400)
              .json({ message: "couldn't send verification mail" });
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
      // Commit transaction
      await t.commit();
      res.status(200).json({ message: "User updated successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Delete User
exports.delete = async (req, res, next) => {
  try {
    const { userId } = req.params;
    // Start transaction
    const t = await sequelize.transaction();
    try {
      const deletedRowCount = await User.destroy({
        where: { id: userId },
        transaction: t,
      });
      if (deletedRowCount === 0) {
        return res.status(400).json({ message: "User not found" });
      }
      // Commit transaction
      await t.commit();
      return res.status(200).json({ message: "user deleted successfully" });
    } catch (error) {
      // Rollback transaction if any error occurs
      await t.rollback();
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

// Sign In User
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });
    // Set the token in response headers
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

// Middleware to ensure user is authenticated
exports.ensureAuthenticated = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token.split(" ")[1], process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Lost Password
exports.lostPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const resetToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Your Password",
      html: `<p>Please click <a href="http://yourdomain.com/reset-password/${resetToken}">here</a> to reset your password. This link is valid for 5 minutes only</p>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error occurred while sending email:", err);
        return res
          .status(500)
          .json({ message: "Failed to send reset password link" });
      } else {
        return res
          .status(200)
          .json({ message: "Reset password link sent successfully" });
      }
    });
  } catch (error) {
    next(error);
  }
};

// Verify Mail
exports.verifyMail = async (req, res, next) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      const userId = decoded.userId;
      await User.update({ verifiedEmail: true }, { where: { id: userId } });
      return res.status(200).json({ message: "Email verified successfully" });
    });
  } catch (error) {
    next(error);
  }
};

// Send OTP
exports.sendOtp = async (req, res, next) => {
  try {
    const { mobileNumber } = req.body;
    if (!validateMobile(mobileNumber)) {
      return res.status(400).json({
        message: "Invalid mobile number format or unavailable country",
      });
    }
    let sendOtp = Math.floor(Math.random() * 900000) + 100000;
    let data = JSON.stringify({
      Text: `Your OTP to verify THC account is ${sendOtp} - THCCLO`,
      Number: mobileNumber,
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `https://restapi.smscountry.com/v0.1/Accounts/${process.env.AuthKey}/SMSes/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.CONVERTED_BASE64_SMS_TOKEN}`,
      },
      data: data,
    };
    try {
      axios.request(config).then(async (response) => {
        const t = await sequelize.transaction();
        if (response.data.Success) {
          const updateFields = { currentOtp: sendOtp };
          const [updatedRowsCount] = await User.update(updateFields, {
            where: { id: userId },
            returning: true,
            transaction: t,
          });
          if (updatedRowsCount === 0) {
            res.status(400).json({ message: "User not found" });
          }
          await t.commit();
          return res.status(200).json({ message: "Otp sent successfully" });
        } else {
          await t.rollback();
          return res.status(400).json({ message: "Unable to send otp" });
        }
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

// Verify OTP
exports.verifyOtp = async (req, res, next) => {
  try {
    const { userId, otp } = req.body;
    const otpNumber = parseInt(otp);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.currentOtp !== otpNumber) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    user.currentOtp = null;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    next(error);
  }
};

// Reset Password
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      const userId = decoded.userId;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await User.update(
        { password: hashedPassword },
        { where: { id: userId } },
      );
      return res.status(200).json({ message: "Password reset successfully" });
    });
  } catch (error) {
    next(error);
  }
};
