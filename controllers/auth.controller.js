import User from "../models/User.js";


// Function to register a new user
export async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    // Check if username and password are provided
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    await User.create({
      username,
      password,
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
    const isPasswordValued = user.password === password;           // Check if the provided password matches the stored password

    if (!isPasswordValued) {
      return res.status(401).json({ message: "Wrong password" });
    }

    res.status(200).json({ message: "Login successfull!.", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to login!. Try again later",
      error: error.message,
    });
  }
}
