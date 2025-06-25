const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
const user = require("../models/user");
const user = require("../models/user");

// signup endpoint logic
exports.signup = async (req, res) => {
    const { email, password }  = req.body;

    const exist = await user.findOne({ email});
    if (exists) return res.status(400).json({ message: "user already exists" });

    const hashed = await bycrpt.hash(password, 10);
    const user = await user.create({ email, password: hashed });

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    res.json(token);

};

// login endpoint logic

exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await user.findOne({ email });
    if (!user) return res.status(404).json({ message: "user not found"})

        const match = await bycrpt.cpmpare(password, user.password);
        if (!match) return res.status(401).json({ message: "incorrect password"})

    const token = jwt.sign({ id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: '1h'

    });
    res.json(token);
}