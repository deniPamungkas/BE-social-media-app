import { db } from "../connectDB.js";
import jwt from "jsonwebtoken";

export const makePost = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err){
      return (
        res.status(201).json({error:"not logged in"})
      )
    }
    const values = [req.body.caption, req.body.img, userInfo.id]
    const q ='INSERT INTO posts (caption, img, userId) VALUE (?)'
      db.query(q, [values], (err, data) => {
      if (err) return res.json(values);
      return res.json(data);
    });
  });
};

export const getPost = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err){
      return (
        res.status(201).json({error:"not logged in"})
      )
    }
    // SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) LEFT JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC
    const q =
      "SELECT distinct p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) JOIN relationships AS r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";
    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};

export const getMyPost = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err){
      return (
        res.status(201).json({error:"not logged in"})
      )
    }
    const q =
      "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (p.userId = u.id) WHERE p.userId = ? ORDER BY p.createdAt DESC";
    db.query(q, [req.params.userId], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, "secretKey", (err, userInfo) => {
    if (err) return res.status(201).json({error:"not logged in"})
    const q =
      "DELETE FROM posts WHERE id = ?";
    db.query(q, [req.params.postId,req.params.postId], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });
};