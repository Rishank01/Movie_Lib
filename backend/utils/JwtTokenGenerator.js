const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

dotenv.config();
secretKey = process.env.JWT_SECRET;

// data is payload
const generateAuthToken = function (data) {  // Here data == userDbInfo
    const token = jwt.sign(
        JSON.stringify({ user: { email: data.email, _id: data._id } }),
        secretKey, // "HELLO" is the secret key
    );
    return token;
}

module.exports = generateAuthToken;
