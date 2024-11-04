require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token || token !== process.env.API_TOKEN) {
        return res.sendStatus(401); // No autorizado
    }
    next(); // Llama al siguiente middleware o ruta
};

module.exports = verifyToken;
