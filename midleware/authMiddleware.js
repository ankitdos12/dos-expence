const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};

const adminOnly = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admins only" });
    }
    next();
};


const userOnly = (req, res, next) => {
    if (req.user.role !== "user") {
        return res.status(403).json({ message: "Users only" });
    }
    next();
};

module.exports = {
    authMiddleware,
    adminOnly,
    userOnly
}
