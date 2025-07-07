const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {type: String, unique: true, sparse: true},
    password: {type: String, required: true},
    googleId: {type: String, unique: true, sparse: true},
    name: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);