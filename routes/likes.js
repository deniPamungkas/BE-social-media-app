import express from 'express'
import { getLikes, hitDislike, hitLike } from '../controllers/likes.js';
const router = express.Router()

router.post('/', getLikes);
router.post('/hitLike', hitLike)
router.delete('/hitDislike', hitDislike)

export default router