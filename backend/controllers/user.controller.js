const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = [
  // Validation rules
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a password that is greater than 6 characters").isLength({ min: 6 }),

  async (req, res) => {
    const { email, password } = req.body;

    // Validate the email and password
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // Check if the email already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          errors: [{ msg: "This user already exists" }]
        });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      user = new User({ email, password: hashedPassword });
      await user.save();

      // Create a token
      const token = JWT.sign({ email }, process.env.SECRET_KEY);
      res.json({ token });
    } catch (error) {
      res.status(500).send("Server error");
    }
  }
];

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Invalid email or password" }]
      });
    }

    // Check if the password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        errors: [{ msg: "Invalid email or password" }]
      });
    }

    // Create a token
    const token = JWT.sign({ email }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
