import jwt from "jsonwebtoken";
export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.MpCookie;
  if (!token) {
    return res.status(401).json({ msg: "No token avalaible" });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (e) {
    return res.status(403).json({ message: "Invalid token" });
  }
};
