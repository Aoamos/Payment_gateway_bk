const mongoose = require('mongoose');
const{v4: uuidv4} = require('uuid');

const walletSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true},
    wallet_id: {type: String, unique: true},
    balance: {type: Number, default: 0}
},
    {timestamps: true});

module.exports = mongoose.model('Wallet', walletSchema);
