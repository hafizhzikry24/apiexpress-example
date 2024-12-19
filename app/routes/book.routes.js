const bookController = require('../controllers/book.controller');
const router = require('express').Router();

router.get('/', bookController.findAll);
router.post('/', bookController.create);
router.get('/:id', bookController.findOne);
router.put('/:id', bookController.update);
router.delete('/:id', bookController.delete);

module.exports = router;