const express = require('express');
const { getAllLotteryData } = require('../controllers/lotteryController');

const router = express.Router();

router.get('/lotteries', getAllLotteryData); // Nueva ruta para todas las loterías

module.exports = router;
