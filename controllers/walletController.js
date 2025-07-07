const wallet = require("../models/wallet")

async function createWallet(req, res){
    try{
        const { user_id} = req.body

        // Validate user_id
        if (!user_id){
            return res.status(400).json({
                error: "User ID is required"
            })
        }

        // Check if the wallet already exists for the user
        const existing = await wallet.findOne({ user_id })
        if (existing) {
            return res.status(409).json({
                error: "Wallet already exists for this user"
            })
        }
        
        // Create and save new wallet
        const newWallet = new wallet({ user_id })
        await newWallet.save()

        return res.status(201).json({
            message: "Wallet created successfully",
            wallet: newWallet
        })
    }catch (err){
        console.error('createWallet error:', err)
        return res.status(500).json({ error: "Server error"})
    }
}

module.exports = {
    createWallet
}