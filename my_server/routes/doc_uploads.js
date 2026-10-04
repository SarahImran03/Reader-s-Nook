const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// the logic for storing the uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/', upload.single('document'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  
  res.json({
    message: 'Added to the shelf successfully!',
    fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
    fileType: req.file.mimetype,
    originalName: req.file.originalname
  });
});

module.exports = router;