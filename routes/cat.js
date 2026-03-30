const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, getCategoryById, DeleteById, addMealToCategory} = require('../controllers/categoryController');

router.get('/', getAllCategories);     
router.get('/:id', getCategoryById);     
router.post('/', addCategory); 
router.delete('/:id', DeleteById);     
router.post('/:categoryId/meals', addMealToCategory);    

module.exports = router;