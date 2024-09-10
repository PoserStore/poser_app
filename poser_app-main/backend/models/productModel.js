const db = require('../config/database');

const ProductModel = {
  // Cria um novo produto
  create: (productData, callback) => {
    const { cor, tamanho, preco, quantidade, tipo } = productData;
    db.query(
      'INSERT INTO produtos (cor, tamanho, preco, quantidade, tipo) VALUES (?, ?, ?, ?, ?)',
      [cor, tamanho, preco, quantidade, tipo],
      callback
    );
  },

  // Lista todos os produtos
  getAll: (callback) => {
    db.query('SELECT * FROM produtos', callback);
  },

  // Busca um produto pelo ID
  findById: (id, callback) => {
    db.query('SELECT * FROM produtos WHERE id = ?', [id], callback);
  },

  // Atualiza um produto pelo ID
  update: (id, productData, callback) => {
    const { cor, tamanho, preco, quantidade, tipo } = productData;
    db.query(
      'UPDATE produtos SET cor = ?, tamanho = ?, preco = ?, quantidade = ?, tipo = ? WHERE id = ?',
      [cor, tamanho, preco, quantidade, tipo, id],
      callback
    );
  },

  // Deleta um produto pelo ID
  delete: (id, callback) => {
    db.query('DELETE FROM produtos WHERE id = ?', [id], callback);
  }
};

module.exports = ProductModel;