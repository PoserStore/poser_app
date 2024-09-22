const express = require('express');
const multer = require('multer');
const authenticateToken = require('../middleware/authMiddleware');
const db = require('../db/db');
const router = express.Router();

// Configuração do multer para salvar imagens
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Rota para criar uma nova postagem (protegida)
router.post('/new', authenticateToken, upload.single('image'), (req, res) => {
    const { content } = req.body;
    const imageUrl = req.file ? req.file.path : null;

    const query = 'INSERT INTO posts (user_id, content, image) VALUES (?, ?, ?)';
    db.query(query, [req.user.id, content, imageUrl], (err, result) => {
        if (err) return res.status(500).json({ message: 'Erro ao criar postagem.' });
        res.status(201).json({ message: 'Postagem criada com sucesso!', postId: result.insertId });
    });
});

// Rota para listar todas as postagens
router.get('/all', (req, res) => {
    const query = 'SELECT posts.*, users.username FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Erro ao buscar postagens.' });
        res.json(results);
    });
});

module.exports = router;