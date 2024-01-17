const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Ensure the file has an allowed extension
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  const fileExtension = '.' + file.originalname.split('.').pop().toLowerCase();
  if (allowedExtensions.includes(fileExtension)) {
    return cb(null, true);
  }
  cb(new Error('Invalid file type.'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
