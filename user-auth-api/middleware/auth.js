const jwt = require('jsonwebtoken');

// Middleware para verificar el token JWT
const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(403).json({ message: 'Acceso denegado' });

    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = verified;
        next(); // Pasar al siguiente middleware
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

module.exports = auth;
