const fs = require('fs')
const path = require('path')
const Image = require('../models/Image')

const getImage = async (req, res, next) => {
  try {       
    if(req.file) {
      const image = await Image.create({
        data : fs.readFileSync(path.join(__dirname, '..', '..', '..', 'uploads', req.file.filename)),
        type: 'image/png'
      })
      req.body[req.file.fieldname] = image._id.toString()
    }    
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = getImage