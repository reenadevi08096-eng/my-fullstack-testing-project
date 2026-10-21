const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { getItems, createItem, deleteItem } = require('../controllers/itemController');

router.get('/', getItems);
router.post('/', upload.single('image'), createItem);
router.delete('/:id', deleteItem);

module.exports = router;