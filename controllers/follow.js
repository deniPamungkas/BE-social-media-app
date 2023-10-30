import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

export const follow = (req, res) => {
  const q =
    "INSERT INTO `relationships`(`followerUserId`, `followedUserId`) VALUES (?)";
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.json("not logged in");
    const values = [userInfo.id, req.body.userId];
    db.query(q, [values], (err, data) => {
      if (err) return res.json({ elor: err });
      return res.json(data);
    });
  });
};

export const unFollow = (req, res) => {
  const q =
    "DELETE FROM `relationships` WHERE followerUserId = ? AND followedUserId = ?";
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.json("not logged in");
    db.query(q, [userInfo.id, req.params.userId], (err, data) => {
      if (err) return res.json({ elor: err });
      return res.json(data);
    });
  });
};

export const getFollowed = (req, res) => {
  const q =
    "SELECT r.*, u.id AS userId, name, profilePic FROM relationships AS r JOIN users AS u ON (r.followedUserId = u.id) WHERE r.followerUserId = ? OR r.followedUserId = ?";
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.json("not logged in");
    const val = () => {
      if(req.params.userId == 0) {return userInfo.id}
      else {return req.params.userId}
    }
    let value = val()
    db.query(q, [value,value], (err, data) => {
      if (err) return res.json({ elor: err });
      return res.json(data);
    });
  });
};
