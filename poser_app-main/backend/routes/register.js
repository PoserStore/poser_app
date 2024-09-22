const express = require('express');
const bcrypt = require('bcryptjs');
const db = require('../db/db');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    console.log('Tentativa de registro:', { username, password, email });

    // Verifica se o usuário já existe
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    db.query(checkUserQuery, [username], async (err, result) => {
        if (err) {
            console.error('Erro ao verificar usuário:', err);
            return res.status(500).json({ message: 'Erro no servidor.' });
        }
        if (result.length > 0) {
            console.log('Usuário já existe:', username);
            return res.status(400).json({ message: 'Usuário já existe.' });
        }

        try {
            // Criptografa a senha
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Senha criptografada:', hashedPassword);

            // Insere o novo usuário
            const insertQuery = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
            db.query(insertQuery, [username, hashedPassword, email], (err, result) => {
                if (err) {
                    console.error('Erro ao cadastrar usuário:', err);
                    return res.status(500).json({ message: 'Erro ao cadastrar usuário.' });
                }
                res.status(201).json({ message: 'Usuário criado com sucesso!' });
            });
        } catch (error) {
            console.error('Erro ao criptografar a senha:', error);
            return res.status(500).json({ message: 'Erro ao processar a solicitação.' });
        }
    });
});



module.exports = router;
