const multer = require("multer");
const path = require("path");

// Define storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded files
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    // Set the file name with the original name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Create the upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
  fileFilter: (req, file, cb) => {
    
    if (file.mimetype.startsWith("image/"))
      {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type, only images are allowed!"), false);
    }
  },
});

module.exports = upload;
