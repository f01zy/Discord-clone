const multer = require("multer")
const uuid = require("uuid")

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "static/avatars/")
  },
  filename(req, file, cb) {
    cb(null, uuid.v4() + ".jpg")
  }
})

const types = ["image/png", "image/jpg", "image/jpeg"]

const fileFilter = (req, file, cb) => {
  if(types.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

module.exports = multer({storage, fileFilter})