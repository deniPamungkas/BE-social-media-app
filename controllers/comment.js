import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

export const getComments = (req, res) => {
  const q =
    "SELECT c.*,u.id as userId, name, profilePic FROM comments AS c JOIN users AS u ON (c.userId = u.id) WHERE c.postId = ? ORDER BY c.createdAt DESC";
  const values = [req.body.postId];
  db.query(q, [values], (err, data) => {
    if (err) return res.json({ elor: err });
    return res.json(data);
  });
};

export const makeComment = (req, res) => {
  const q = "INSERT INTO comments (commentCaption,postId,userId) VALUE (?)";
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.json("not logged in");
    const values = [req.body.commentCaption, req.body.postId, userInfo.id];
    db.query(q, [values], (err, data) => {
      if (err) return res.json({ elor: err });
      return res.json(data);
    });
  });
};
