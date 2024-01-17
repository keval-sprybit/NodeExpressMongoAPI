'use strict';

var common_methods = require("../common/common_methods");
const fs = require('fs-extra');
const upload = require('../multerConfig'); // Assuming the location of your multerConfig file

exports.uploadImage = async (req, res) => {
  try {
    upload.single('book_image')(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Access the uploaded file information using req.file
      const file = req.file;

      // Check if a file was actually uploaded
      if (!file) {
        return res.status(400).json({ error: 'No file uploaded.' });
      }

      // Do something with the file (save to storage, etc.)
      const tempImagePath = `path/to/upload/directory/${file.originalname}`;
       fs.move(file.path, tempImagePath);

      // Respond to the client
      const response = {
        status: "success",
        message: "Data get successfully",
        data: { originalname: file.originalname, path: tempImagePath }
      };
      res.json(response);
    });
  } catch (err) {
    res.status(500).json({ error: "Error" + err });
  }
};
