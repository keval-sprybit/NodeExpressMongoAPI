const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    uploadImage,
} = require('./controller/imageController'); // Import controller functions for the Book model

// const upload = multer({ dest: 'uploads/' });
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
//     }
//   });
  
//   const fileFilter = (req, file, cb) => {
//     // Ensure the file has an allowed extension
//     const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
//     const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
//     if (allowedExtensions.includes(fileExtension)) {
//       return cb(null, true);
//     }
//     cb(new Error('Invalid file type.'));
//   };
  
//   const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter
//   });



router.post('/image/image-upload',uploadImage);
// router.post('/image/image-upload', upload.single('book_image'), uploadImage);

module.exports = router;
