const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

const UserController = {
  register: async (req, res) => {
    const { nome, cpf, telefone, email, username, senha } = req.body;

    // Verifica se o usuário já existe
    UserModel.findByEmail(email, async (err, result) => {
      if (result.length > 0) {
        return res.status(400).json({ message: 'Usuário já existe' });
      }

      // Criptografa a senha, a criptografia pode ser bem grande então não esquece de verificar se tem bastante casas pra trazer ela
      const hashedPassword = await bcrypt.hash(senha, 100);

      // Cria o novo usuário
      const userData = { nome, cpf, telefone, email, username, senha: hashedPassword };
      UserModel.create(userData, (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Erro ao registrar usuário' });
        }
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
      });
    });
  },

  login: (req, res) => {
    const { email, senha } = req.body;

    // Verifica se o usuário existe
    UserModel.findByEmail(email, async (err, result) => {
      if (err || result.length === 0) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const user = result[0];

      // Verifica a senha
      const validPassword = await bcrypt.compare(senha, user.senha);
      if (!validPassword) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      // Gera um token JWT 
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    });
  }
};

module.exports = UserController;
