const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure directory exists
const UPLOAD_DIR = "./public/images/banner/";
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, safeName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype;

  if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files (jpeg, png, webp, gif) are allowed"));
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 20 MB max per file
    files: 50,                 // Total file count limit
    fieldNameSize: 100,        // Optional: max field name length
    fieldSize: 100 * 1024 * 1024,
    fields: 100                // Optional: max non-file fields
  },
  fileFilter
});

module.exports = upload;
