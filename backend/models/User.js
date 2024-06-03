const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type: 'string',
        required: true,
        trim : true,
    },
    email : {
        type: 'string',
        required: true,
        trim : true,
    },
    password : {
        type: 'string',
        required: true,
    }
})

let User= mongoose.model('User', UserSchema);
module.exports=User;