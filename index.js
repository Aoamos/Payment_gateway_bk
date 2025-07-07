require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=> console.log('mongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:',err));

app.get('/', (req, res) => res.send('Payment Gateway Backend (mongoDB) is running'));
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
