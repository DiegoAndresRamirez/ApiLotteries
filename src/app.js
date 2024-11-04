const express = require('express');
const cors = require('cors');
const lotteryRoutes = require('./src/routes/lotteryRoutes');
const verifyToken = require('./src/middlewares/tokenMiddleware'); // Importar el middleware

const app = express();
const port = process.env.PORT || 3000;

// Usar CORS y otros middleware
app.use(cors());
app.use(express.json()); // Asegúrate de que tu API pueda manejar JSON

// Proteger las rutas de la API con el middleware de verificación de token
app.use('/api', verifyToken, lotteryRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
