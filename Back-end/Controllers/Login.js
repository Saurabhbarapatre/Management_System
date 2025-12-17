import db from "../DB.js";
import jwt from "jsonwebtoken";

const JWT = "mysecretKey";

const Login = (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM auth_table WHERE email=? AND password=?";
  const value = [email, password];

  db.query(sql, value, (err, result) => {
    if (err) {
      return json({ error: err });
    }

    if (result.length > 0) {
      const token = jwt.sign(
        {
          Email: result[0].email,
        },
        JWT,
        { expiresIn: "1h" }
      );

      return res.json({ message: "Sucess", token });
    } else {
      return res.json({ mesage: "Acess denied" });
    }
  });
};

export default Login;
