const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();

const upload = multer({
    storage
});


const streamifier = require("streamifier");

router.post(
  "/",
  upload.single("image"),
  async (req, res) => {

    try {

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded"
        });
      }

      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "gold-trim-salon"
        },
        (error, result) => {

          if (error) {
            return res.status(500).json({
              success: false,
              message: error.message
            });
          }

          return res.json({
            success: true,
            imageUrl: result.secure_url
          });

        }
      );

      streamifier
        .createReadStream(req.file.buffer)
        .pipe(stream);

    } catch (error) {

      return res.status(500).json({
        success: false,
        message: error.message
      });

    }

  }
);


router.get("/env-test", (req, res) => {
  res.json({
    CLOUDINARY_URL: !!process.env.CLOUDINARY_URL,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || null,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || null,
    CLOUDINARY_API_SECRET: !!process.env.CLOUDINARY_API_SECRET
  });
});

router.get("/cloudinary-test", async (req, res) => {

    try {

        const result = await cloudinary.api.ping();

        res.json(result);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});



router.get("/cloudinary-auth-test", async (req, res) => {

    try {

        const result = await cloudinary.api.ping();

        res.json({
            success: true,
            result
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});

module.exports = router;