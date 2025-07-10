import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file

function generateToken(user, exp) {
  try {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: exp || "1h",
    }); // Generate a JWT token
    return token;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}
export default generateToken;
