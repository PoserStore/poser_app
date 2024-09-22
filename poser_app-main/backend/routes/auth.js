const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Busca o usuário no banco de dados
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro no servidor.' });
        if (result.length === 0) return res.status(400).json({ message: 'Usuário não encontrado.' });

        const user = result[0];

        // Comparação de senha com bcrypt
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Senha incorreta.' });

        // Geração do JWT
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    });
});

module.exports = router;
