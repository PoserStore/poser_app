const ProductModel = require('../models/productModel');

const ProductController = {
  // Método para criar um novo produto
  create: (req, res) => {
    const { cor, tamanho, preco, quantidade, tipo } = req.body;

    // Cria novo produto
    const productData = { cor, tamanho, preco, quantidade, tipo };
    ProductModel.create(productData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao criar o produto' });
      }
      res.status(201).json({ message: 'Produto criado com sucesso', produto: result });
    });
  },

  // Listar os produtos
  getAll: (req, res) => {
    ProductModel.getAll((err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao buscar produtos' });
      }
      res.status(200).json(result);
    });
  },

  // Buscar POR ID
  getById: (req, res) => {
    const { id } = req.params;

    ProductModel.findById(id, (err, result) => {
      if (err || result.length === 0) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.status(200).json(result[0]);
    });
  },

  // Atualizando produto pelo ID dele
  update: (req, res) => {
    const { id } = req.params;
    const { cor, tamanho, preco, quantidade, tipo } = req.body;

    const productData = { cor, tamanho, preco, quantidade, tipo };

    ProductModel.update(id, productData, (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Erro ao atualizar o produto' });
      }
      res.status(200).json({ message: 'Produto atualizado com sucesso' });
    });
  },

  // Deleta produto sempre por ID 
  delete: (req, res) => {
    const { id } = req.params;

    ProductModel.delete(id, (err, result) => {
      if (err) {
        return res.status(401).json({ message: 'Erro ao deletar o produto' });
      }
      res.status(200).json({ message: 'Produto deletado com sucesso' });
    });
  }
};

module.exports = ProductController;
