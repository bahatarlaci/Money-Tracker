const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Transaction = require('./models/Transaction.js');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ body: 'Hello from server!' });
});

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    const { name, datetime, description, price } = req.body;
    const newTransaction = await Transaction.create({ name, datetime, description, price });
    res.json(newTransaction);
});

app.listen(4000, () => {
    console.log('Server listening on port 4000');
});