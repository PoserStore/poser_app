const express = require('express');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const bodyParser = require('body-parser');
const registerRoutes = require('./routes/register');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve arquivos de upload

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/register', registerRoutes);

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
