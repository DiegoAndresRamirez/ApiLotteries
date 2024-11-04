const express = require('express');
const cors = require('cors');
const lotteryRoutes = require('./src/routes/lotteryRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());
app.use('/api', lotteryRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
