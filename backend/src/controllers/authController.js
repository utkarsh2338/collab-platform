const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { Op } = require("sequelize");

const { User } = require('../models');
const { jwtSecret, jwtExpiration } = require('../config/jwt');
const sendEmail = require("../utils/sendEmail");


// ======================== REGISTER ========================
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        user = await User.create({
            username,
            email,
            password_hash,
        });

        const payload = {
            id: user.id,
            role: user.role,
        };

        jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// ======================== LOGIN ========================
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        const payload = {
            id: user.id,
            role: user.role,
        };

        jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiration }, (err, token) => {
            if (err) throw err;
            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// ======================== GET ME ========================
exports.getMe = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password_hash'] },
        });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// ======================== FORGOT PASSWORD ========================
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        user.reset_token = hashedToken;
        user.reset_token_expires = Date.now() + 1000 * 60 * 15;
        await user.save();

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await sendEmail({
            to: user.email,
            subject: "Password Reset",
            html: `
                <h2>Password Reset Request</h2>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link expires in 15 minutes.</p>
            `
        });

        return res.json({ message: "Password reset link sent!" });

    } catch (error) {
        console.error("ForgotPassword Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


// ======================== RESET PASSWORD ========================
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            where: {
                reset_token: hashedToken,
                reset_token_expires: { [Op.gt]: Date.now() }
            }
        });

        if (!user) {
            return res.status(400).json({ message: "Token invalid or expired" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user.password_hash = hashedPassword;
        user.reset_token = null;
        user.reset_token_expires = null;

        await user.save();

        return res.json({ message: "Password reset successful! You can now login." });
    } catch (err) {
        console.error("ResetPassword Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
