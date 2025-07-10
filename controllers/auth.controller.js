import User from "../models/User.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

// Function to register a new user
export async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    // Check if username and password are provided
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).json({ message: "user already exsists!" });

    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving

    await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create user!. Try again later",
      error: error.message,
    });
  }
}

// Function to handle user login
export async function login(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    // Check if username and password are provided
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare the provided password with the hashed password

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // If login is successful, you can return user details or a token
    const token = generateToken(user);
    res.status(200).json({ message: "Login successfull!.", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
