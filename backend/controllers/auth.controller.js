import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            throw new Error('Please fill all the fields');
        }

        const userAlreadyExists = await User.findOne({ email });

        if (userAlreadyExists) {
            res.status(400).json({ success: false, message: 'User already exists' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
        });

        await user.save();

        generateTokenAndSetCookie(res, user._id);
        res.status(201).json({
            success: true,
            message: 'User created successfully',
            user: {
                ...user._doc,
                password: null,
            }
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
    }
};

export const login = async (req, res) => {
    res.send('Login route');
};

export const logout = async (req, res) => {
    res.send('Logout route');
};