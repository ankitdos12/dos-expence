const express = require("express");
const {
    registerAdmin,
    adminLogin,
    createUserByAdmin,
    userLogin,
} = require("../controllers/authController");
const { authMiddleware, adminOnly } = require("../midleware/authMiddleware");

const router = express.Router();

router.post("/admin/register", registerAdmin);
router.post("/admin/login", adminLogin);
router.post("/admin/create-user", authMiddleware, adminOnly, createUserByAdmin);
router.post("/user/login", userLogin);

module.exports = router;
