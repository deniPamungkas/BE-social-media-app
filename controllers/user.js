import {db} from '../connectDB.js'
import jwt from 'jsonwebtoken'

export const getUser = (req,res) => {
    const q = 'SELECT u.*, followerUserId, followedUserId FROM users AS u JOIN relationships AS r ON (r.followedUserId = ?) WHERE u.id=?'
    db.query(q,[req.params.userId, req.params.userId], (err,data)=>{
        if(err) return res.json({elor:err})
        return res.json(data)
    })
}

export const getMyUser = (req,res) => {
    const q = 'SELECT * FROM users  WHERE id=?'
    const token = req.cookies.accessToken;
    jwt.verify(token, 'secretKey', (err,userInfo)=>{
        if(err) return res.json('not logged in')
        db.query(q,[userInfo.id], (err,data)=>{
            if(err) return res.json({elor:err})
            return res.json(data)
        })
    })
}

export const getUsers = (req,res) => {
    const q = 'SELECT u.*, r.followedUserId, r.followerUserId FROM users AS u LEFT JOIN relationships AS r ON ( r.followedUserId = u.id AND r.followerUserId = ?)'
    const token = req.cookies.accessToken
    jwt.verify(token, "secretKey", (err, userInfo)=>{
        if(err) return res.json('not logged in')
        db.query(q,[userInfo.id], (err,data)=>{
            if(err) return res.json({elor:err})
            return res.json(data)
        })
    })
}

export const updateUser = (req,res) =>{
    const q = 'UPDATE `users` SET name = ?, city = ?, website = ?, profilePic = ?, coverPic = ? WHERE id = ?'
    const {Name, City, Website, ProfilePic, CoverPic} = req.body
    const token = req.cookies.accessToken;
    jwt.verify(token, 'secretKey', (err, userInfo)=>{
        if(err) return res.json('not logged in')
        db.query(q, [Name, City, Website, ProfilePic, CoverPic, userInfo.id], (err, data)=>{
            if(err) return res.json({elor:err})
            return res.json(data)
    })
    })
}