const { fetchAllLotteryData } = require('../services/lotteryService');

const getAllLotteryData = async (req, res) => {
    try {
        const data = await fetchAllLotteryData();
        res.json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lottery data' });
    }
};

module.exports = { getAllLotteryData };
