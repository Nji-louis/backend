const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();

const upload = multer({
    storage
});


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

      const fileStr =
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      const result =
        await cloudinary.uploader.upload(
          fileStr,
          {
            folder: "gold-trim-salon"
          }
        );

      res.json({
        success: true,
        imageUrl: result.secure_url
      });

    }  catch (error) {

  console.error(error);

  res.status(500).json({
    success: false,
    message: error.message
  });

}

  }
);



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