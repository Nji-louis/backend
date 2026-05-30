const express = require("express");

const router = express.Router();

const db = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");

const verifyAdmin = require("../middleware/adminMiddleware");


// ==========================
// ADMIN DASHBOARD STATS
// ==========================

router.get("/stats",
  verifyToken,
  verifyAdmin,
  (req, res) => {

    db.query(
      `
      SELECT
(SELECT COUNT(*) FROM users) AS totalUsers,
(SELECT COUNT(*) FROM products) AS totalProducts,
(SELECT COUNT(*) FROM orders) AS totalOrders,
(SELECT COUNT(*) FROM messages) AS totalMessages
      `,
      (err, results) => {

        if (err) {
          return res.status(500).json(err);
        }

        res.json(results[0]);

      }
    );

  }
);

module.exports = router;