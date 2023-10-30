import express from 'express'
import { getMyUser, getUser, getUsers, updateUser } from '../controllers/user.js'
const router = express.Router()

router.get('/:userId', getUser)
router.get('/myuser/user', getMyUser)
router.get('', getUsers)
router.put('/update', updateUser)

export default router