const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require('path');

const userController = require("../controller/user");

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save files to "uploads" directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique names
    }
});
const upload = multer({ storage: storage });

router.post("/", upload.single('photo'), userController.createUser);
router.get("/:id", userController.getUser);
module.exports = router;