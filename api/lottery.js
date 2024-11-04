const { fetchLotteryData } = require('../src/controllers/lotteryController');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        try {
            const data = await fetchLotteryData();
            return res.status(200).json(data);
        } catch (error) {
            console.error('Error fetching lottery data:', error);
            return res.status(500).json({ error: 'Failed to fetch lottery data' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
};
