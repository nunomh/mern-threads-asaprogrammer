import User from '../models/userModel.js';

const signupUser = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const user = await User.findOne({ $or: [{ email }, { username }] });
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log('Error in signupUser: ', error.message);
    }
};

export { signupUser };
