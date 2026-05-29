const express = require("express");

const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

router.post(
  "/image",
  upload.single("image"),
  (req, res) => {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    res.json({
      success: true,
      filename: req.file.filename,
      path: `/uploads/${req.file.filename}`
    });

  }
);

module.exports = router;