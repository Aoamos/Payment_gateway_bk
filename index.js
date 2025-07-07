require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const mongoose = require('mongoose');

const walletRoutes = require('./routes/wallet');

const app = express();
app.use(express.json());

connectDB().then(() => {
    app.use('/api/wallet', walletRoutes)
    app.get('/', (req, res) => res.send('Payment Gateway Backend (mongoDB) is running'));
    app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));
})



