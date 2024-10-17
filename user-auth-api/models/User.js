const db = require('../config/db');

// Clase para manejar operaciones relacionadas con el usuario
class User {
    // Método para registrar un nuevo usuario
    static register(username, password) {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
            db.query(query, [username, password], (err, results) => {
                if (err) return reject(err);
                resolve(results);
            });
        });
    }

    // Método para encontrar un usuario por nombre de usuario
    static findByUsername(username) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM users WHERE username = ?';
            db.query(query, [username], (err, results) => {
                if (err) return reject(err);
                resolve(results[0]);
            });
        });
    }
}

module.exports = User;
