const express = require('express');
const ProductController = require('../controllers/productController');

const router = express.Router();

// Rotas para o produto, tá tudo ai!
router.post('/create', ProductController.create);
router.get('/all', ProductController.getAll);
router.get('/:id', ProductController.getById);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

module.exports = router;
