import verifyToken from "../utils/verifyToken.js";

export async function authorization(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Unauthorized access!" });

  const token = authHeader.split(" ")[1];

  try {
    const id = verifyToken(token);
    req.userId = id; // Attach the user Id to the request object
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }

  next();
}
