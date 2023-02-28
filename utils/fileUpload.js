const multer = require('multer')
const path = require('path')

// Set storage
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

// Initialize upload
const upload = multer({
  storage,
  limits: { fileSize: 5000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  }
})

// check file for image
function checkFileType(file, cb) {
  const fileType = /jpeg|jpg|png|gif/
  const extname = fileType.test(path.extname(file.originalname).toLowerCase())
  const mimetype = fileType.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: You can only upload image files')
  }
}


module.exports = upload















// const multer = require('multer');
// const path = require('path');


// // Set Storage
// const storage = multer.diskStorage({
//   destination: '/public/uploads',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//   }
// })

// // Initialize upload
// const upload = multer({
//   storage,
//   limits: { fileSize: 10000000 },
//   fileFilter: function(req, file, cb){
//     checkFileType(file,cb)
//   }
// })

// // Check file for image
// function checkFileType(file, cb){
//   const filetypes = /jpeg|jpg|png|gif/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)

//   if(mimetype && extname){
//       return cb(null, true)
//   } else {
//     cb('Error: You can only upload image files')
//   }
// }


// module.exports = upload