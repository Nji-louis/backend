const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const router = express.Router();
const db = require("../config/db");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword);

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

  db.query(sql, [name, email, hashedPassword], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "User Registered",
    });
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (results.length === 0) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const user = results[0];

      const validPassword = await bcrypt.compare(
        password,
        user.password
      );

      if (!validPassword) {
        return res.status(400).json({
          message: "Invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      res.json({
        token,
        user,
      });
    }
  );
});

module.exports = router;