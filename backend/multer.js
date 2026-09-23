// backend/multer.js

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// ===============================
// Local uploads directory
// ===============================

const uploadsDir = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log(`✅ Created directory: ${uploadsDir}`);
}

// ===============================
// Cloudinary configuration
// ===============================

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ===============================
// General uploads
// ===============================

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },

    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);

        const ext = path.extname(file.originalname);
        const filename = path.basename(file.originalname, ext);

        cb(null, `${filename}-${uniqueSuffix}${ext}`);
    },
});

// ===============================
// Product images → Cloudinary
// ===============================

const pstorage = new CloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "ecommerce-products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

// ===============================
// Upload handlers
// ===============================

const upload = multer({
    storage: storage,
});

const pupload = multer({
    storage: pstorage,
});

// ===============================
// Export
// ===============================

module.exports = {
    upload,
    pupload,
};