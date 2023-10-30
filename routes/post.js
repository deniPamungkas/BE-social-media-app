import express from 'express'
import { makePost, getPost, getMyPost, deletePost} from '../controllers/post.js'

const router = express.Router()

router.post('/makePost', makePost)
router.get('/', getPost)
router.get('/profile/:userId', getMyPost)
router.delete('/deletePost/:postId', deletePost)

export default router