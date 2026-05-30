const verifyToken = require("../middleware/authMiddleware");
const verifyAdmin = require("../middleware/adminMiddleware");
const express = require("express");
const router = express.Router();
const sendEmail = require("../utils/sendEmail");

const db = require("../config/db");


router.post("/", async (req, res) => {

    const {
        name,
        email,
        subject,
        message
    } = req.body;

    const sql =
        "INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)";

    db.query(
        sql,
        [name, email, subject, message],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            try {

                await sendEmail(
                    `New Contact Form Message: ${subject}`,
                    `
Name: ${name}

Email: ${email}

Subject: ${subject}

Message:
${message}
                    `
                );

            } catch (emailError) {

                console.error("Email Error:", emailError);

            }

            res.json({
                success: true,
                message: "Message Sent Successfully"
            });

        }
    );

});


router.get(
    "/",
    verifyToken,
    verifyAdmin,
    (req, res) => {

    db.query(
        "SELECT * FROM messages ORDER BY created_at DESC",
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

});

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Messages route working"
    });
});

module.exports = router;