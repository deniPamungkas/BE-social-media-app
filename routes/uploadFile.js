import express from 'express'
import multer from "multer"

const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname )
      }
  })
  
  const upload = multer({ storage: storage })

router.post('/upload', upload.single('file'), (req,res)=>{
  const file = req.file
  if(file) return res.json('file uploaded')
  return res.json('file not uploaded')
})

export default router