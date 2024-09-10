const db = require('../config/database');

const UserModel = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (userData, callback) => {
    const { nome, cpf, telefone, email, username, senha } = userData;
    db.query('INSERT INTO users (nome, cpf, telefone, email, username, senha) VALUES (?, ?, ?, ?, ?, ?)', 
      [nome, cpf, telefone, email, username, senha], callback);
  }
};

module.exports = UserModel;
