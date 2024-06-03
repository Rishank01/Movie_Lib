const jwt = require('jsonwebtoken');

const validateUser = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log("In validateUser");

    if (token === null || token === undefined) { // Check explicitly for null or undefined
        return res.status(401).json({ message: 'Unauthorized user. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, "HELLO");
        console.log("Decoded Token:", decoded); // Log the decoded token
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error("Error decoding token:", error);
        res.status(400).json({ message: 'Unauthorized user. Invalid token.' });
    }
};


module.exports = validateUser;
