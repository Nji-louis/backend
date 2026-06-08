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

            const result = await cloudinary.uploader.upload(
                `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
                {
                    folder: "gold-trim-salon"
                }
            );

            res.json({
                success: true,
                imageUrl: result.secure_url
            });

        } catch (error) {

    console.error("Cloudinary Error:", error);

    res.status(500).json({
        success: false,
        error: error.message,
        details: error
    });

}

    }
);

module.exports = router;