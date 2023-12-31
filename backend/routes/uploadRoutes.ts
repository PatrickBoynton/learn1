import express from 'express'
import multer from 'multer'
import path from 'path'

const router = express.Router()

const storage = multer.diskStorage({
  destination(_, __, cb) {
    cb(null, 'uploads/')
  },
  filename(_, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

const checkFileType = (file: any, cb: any) => {
  const fileTypes = /jpg|jpeg|png/
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileTypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
})

router.post('/', upload.single('image'), (req, res) => {
  res.status(200).send({
    message: 'Image successfully uploaded.',
    image: `/${req.file?.path}`,
  })
})

export default router
