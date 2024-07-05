import multer from 'multer'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {    
    cb(null, Date.now().toString())
  }
})
const upload = multer({ storage: storage, limits : 10 * 1024})

export default upload