const mongoose = require('mongoose');
const{v4: uuidv4} = require('uuid');

const walletSchema = new mongoose.Schema({
    _id: {type: String, default:uuidv4},
    user_id: {type: String, required: true},
    balance: {type: Number, default: 0}
},
    {timestamps: true});

module.exports = mongoose.model('Wallet', walletSchema);
