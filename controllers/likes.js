import {db} from '../connectDB.js'
import jwt from 'jsonwebtoken'

export const getLikes = (req,res) => {
    const q = 'SELECT * FROM likes WHERE likePostId = ?'
    db.query(q, [req.body.postId], (err,data)=>{
        if(err) return res.json({error:err})
        return res.json(data)
    })
}

export const hitLike = (req,res)=>{
    const q = 'INSERT INTO likes (likeUserId, likePostId) VALUE (?)'
    const token = req.cookies.accessToken;
    jwt.verify(token,"secretKey", (err,userInfo)=>{
        if(err) return res.json("not logged in")
        const values = [userInfo.id, req.body.postId]
        db.query(q,[values], (err,data)=>{
            if(err) return res.json({elor:err})
            return res.json(data)
        })
    })
}

export const hitDislike = (req,res)=>{
    const q = 'DELETE FROM `likes` WHERE likeUserId = ? AND likePostId = ?'
    const token = req.cookies.accessToken;
    jwt.verify(token,"secretKey", (err,userInfo)=>{
        if(err) return res.json("not logged in")
        const values = [userInfo.id, req.query.postId]
        db.query(q,values, (err,data)=>{
            if(err) return res.json({elor:err})
            return res.json(data)
        })
    })
}