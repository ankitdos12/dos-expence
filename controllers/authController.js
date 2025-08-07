const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerAdmin = async (req, res) => {
    const { email, phone, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new User({
            email,
            phone,
            password: hashedPassword,
            role: "admin",
        });
        await admin.save();
        res.status(201).json({ message: "Admin registered" });
    } catch (err) {
        res.status(400).json({ error: "Admin registration failed", details: err });
    }
};

const adminLogin = async (req, res) => {
    const { emailOrPhone, password } = req.body;
    try {
        const admin = await User.findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
            role: "admin",
        });
        if (!admin) return res.status(400).json({ error: "Admin not found" });

        const match = await bcrypt.compare(password, admin.password);
        if (!match) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
        res.json({ token, role: admin.role,  _id: admin._id  });

    } catch {
        res.status(500).json({ error: "Login failed" });
    }
};

const createUserByAdmin = async (req, res) => {
    const { name, pin } = req.body;
    try {
        const hashedPin = await bcrypt.hash(pin, 10);
        const user = new User({ name, pin: hashedPin, role: "user" });
        await user.save();
        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(400).json({ error: "User creation failed", details: err });
    }
};

const userLogin = async (req, res) => {
    const { name, pin } = req.body;
    try {
        const user = await User.findOne({ name, role: "user" });
        if (!user) return res.status(404).json({ error: "User not found" });

        const match = await bcrypt.compare(pin, user.pin);
        if (!match) return res.status(400).json({ error: "Invalid pin" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ token, role: user.role,  _id: user._id  });
    } catch {
        res.status(500).json({ error: "Login error" });
    }
};


module.exports = {
    registerAdmin,
    adminLogin,
    createUserByAdmin,
    userLogin,
}
