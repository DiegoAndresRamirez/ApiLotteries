const express = require('express');
const lotteryRoutes = require('./routes/lotteryRoutes');

const app = express();

app.use('/api', lotteryRoutes);

module.exports = app;
