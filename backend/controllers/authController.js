const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");

// register user

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    if (user) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const msg = `Welcome to Shopnest,${name} ! Thankyou for registering wiht us. We are excited to have you. Your OTP for Shopnest registration is: ${otp}`;
      await sendEmail(
        email,
        "Welcome to ShopNest- Your OTP for registration",
        msg,
      );
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({ message: "Internal server error" });
  }
};

// login user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//get users user

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// otp verification

module.exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.otp === otp) {
      user.verified = true;
      await user.save();
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

