import { db } from "../connectDB.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  //check user if exist
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err);
    if (data.length)
      return res.json({ message: "username already exist", err: true });
    //create user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const q = "INSERT INTO users (username, email, password, name) VALUE (?)";
    const values = [
      req.body.username,
      req.body.email,
      hashedPassword,
      req.body.name,
    ];
    db.query(q, [values], (err, data) => {
      if (err) return res.json(err);
      return res
        .status(200)
        .json({
          message: "registration success, You can login now!",
          err: false,
        });
    });
  });
};
export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  const username = req.body.username;
  const password = req.body.password;
  db.query(q, [username], (err, data) => {
    if (err) return res.json(err);
    if (data.length)
      return bcrypt.compare(password, data[0].password, function (err, result) {
        if (err) return res.json(err);
        if (!result) return res.json({error:"wrong password"});
        const token = jwt.sign({ id: data[0].id }, "secretKey");
        const { password, ...val } = data[0];
        return res.cookie("accessToken", token, { httpOnly: true }).json(val);
      });
    return res.json({error:"username does not exist"});
  });
};
export const logout = (req, res) => {
  res.clearCookie("accessToken",{
    secure:true,
    sameSite:"none"
  }).json('user has been logout');
};
