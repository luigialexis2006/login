const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Controlador para registrar un nuevo usuario
const register = async (req, res) => {
    const { username, password } = req.body;
    
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
        const result = await User.register(username, hashedPassword);
        res.status(201).json({ message: 'Usuario registrado', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
};

// Controlador para loguear un usuario
const login = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findByUsername(username);
        if (!user) return res.status(401).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Contraseña incorrecta' });

        // Generar JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al loguear', error });
    }
};

module.exports = { register, login };
