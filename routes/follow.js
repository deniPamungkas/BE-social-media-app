import express from 'express'
import { follow, getFollowed, unFollow } from '../controllers/follow.js';
const router = express.Router()

router.post('/', follow);
router.delete('/unfollow/:userId', unFollow);
router.get('/getFollowed/:userId', getFollowed)

export default router