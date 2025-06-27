const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { getUserDashboard } = require("../controllers/userController");

router.get("/dashboard", verifyToken, getUserDashboard);

module.exports = router;
