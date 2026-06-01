import jwt from "jsonwebtoken";

async function tokenValidationMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(403).json({
      message: "Invalid or Expired Token",
    });
  }

  req.userId = decoded.User_id;
  next();
}

export default tokenValidationMiddleware
