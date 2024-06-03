const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ConnectDB = () => {
    mongoose.connect(process.env.DB_URL)
    .then(()=>{console.log("DB CONNECTED")})
    .catch((err)=>{console.log("DB NOT CONNECTED",err)})
}

module.exports = ConnectDB;