import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('jwt', token, {
        httpOnly: true, // only accessible by the server
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        sameSite: 'strict', // prevent CSRF attacks
    });

    return token;
};

export default generateTokenAndSetCookie;
