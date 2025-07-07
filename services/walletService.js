const {v4: uuidv4} = require('uuid')
const Wallet = require('../models/wallet')

async function createWallet(userId) {
    if (await Wallet.findOne({user_id: userId})) return;
    const wallet = new Wallet({
        user_id: userId,
        wallet_id: uuidv4(),
    });
    return wallet.save();
}

module.exports = createWallet;