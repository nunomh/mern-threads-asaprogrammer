import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js';

// Signup user
const signupUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { username }] });

        if (user) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                username: newUser.username,
                email: newUser.email,
            });
        } else {
            res.status(400).json({ error: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in signupUser: ', error.message);
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || '');

        if (!user || !isPasswordCorrect) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in loginUser: ', error.message);
    }
};

// Logout user
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in logoutUser: ', error.message);
    }
};

export { signupUser, loginUser, logoutUser };
