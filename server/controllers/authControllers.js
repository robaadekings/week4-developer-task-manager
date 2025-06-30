const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Signup
exports.signup = async (req, res) => {
    const { email, password } = req.body;
     console.log("Received signup request:", { email, password });

    try {
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "User already exists" });

        const hashed = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, password: hashed });

        const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ message: "Signup failed", error: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ message: "User not found" });

        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({ id: existingUser._id, role: existingUser.role }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: "Login failed", error: err.message });
    }
};
