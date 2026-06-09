const express = require("express");

const router = express.Router();

const db = require("../config/db");

const verifyToken = require("../middleware/authMiddleware");

const verifyAdmin = require("../middleware/adminMiddleware");

router.get("/test", (req, res) => {
    res.json({
        success: true,
        message: "Admin route is working"
    });
});

// ==========================
// ADMIN DASHBOARD STATS
// ==========================

router.get(
  "/dashboard",
  verifyToken,
  verifyAdmin,
  async (req, res) => {

    try {

      db.query(
        `
        SELECT
        (SELECT COUNT(*) FROM users) AS totalUsers,
        (SELECT COUNT(*) FROM products) AS totalProducts,
        (SELECT COUNT(*) FROM orders) AS totalOrders,
        (SELECT COUNT(*) FROM messages) AS totalMessages
        `,
        (err, stats) => {

          if (err) {
            return res.status(500).json(err);
          }

          db.query(
            "SELECT id,name,email,created_at FROM users ORDER BY created_at DESC LIMIT 5",
            (err, users) => {

              if (err) {
                return res.status(500).json(err);
              }

              db.query(
                "SELECT * FROM messages ORDER BY created_at DESC LIMIT 5",
                (err, messages) => {

                  if (err) {
                    return res.status(500).json(err);
                  }

                  res.json({
                    stats: stats[0],
                    recentUsers: users,
                    recentMessages: messages
                  });

                }
              );

            }
          );

        }
      );

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

module.exports = router;