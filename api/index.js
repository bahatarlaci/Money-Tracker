const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/api/transactions', async (req, res) => {
    const { name, datetime, description, price } = req.body;
    const newTransaction = await Transaction.create({ name, datetime, description, price });
    res.json(newTransaction);
});

app.get('/api/transactions', async (req, res) => {
    const transactions = await Transaction.find().sort({ datetime: -1 }); // date alanına göre sıralama yapılıyor
    res.json(transactions);
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});