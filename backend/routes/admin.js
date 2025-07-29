const express = require("express");
const { getDashboardStats, getAllUsers, getAllOrders } = require("../controllers/adminController");
const { protect, isAdmin } = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", protect, isAdmin, getDashboardStats);
router.get("/users", protect, isAdmin, getAllUsers);
router.get("/orders", protect, isAdmin, getAllOrders);

module.exports = router;
