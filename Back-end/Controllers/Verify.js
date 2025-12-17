import jwt from "jsonwebtoken";

const JWT = "mysecretKey";

const Verify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.json({ message: "No token provided" });
  }

  jwt.verify(token, JWT, (err, decoded) => {
    if (err) {
      return res.json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

export default Verify;
