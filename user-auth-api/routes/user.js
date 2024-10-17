const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userControllers');

// Ruta para registrar un nuevo usuario
router.post('/register', register);

// Ruta para loguear un usuario
router.post('/login', login);

module.exports = router;
