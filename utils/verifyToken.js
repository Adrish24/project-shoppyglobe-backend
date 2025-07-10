import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// Function to verify JWT token and return user ID
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id; // Return the user ID from the decoded token
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
}

export default verifyToken;
