import express from 'express'
import { getComments, makeComment } from '../controllers/comment.js'
const router = express.Router()

router.post('/', getComments);
router.post('/makeComment', makeComment)


export default router