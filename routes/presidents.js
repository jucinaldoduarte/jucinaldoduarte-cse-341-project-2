const express = require('express');
const router = express.Router();

const templesController = require('../controllers/presidents');
const presidentsController = require('../controllers/presidents');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', presidentsController.getAllPresidents);

router.get('/:id', presidentsController.getSinglePresident);

router.post('/', isAuthenticated, presidentsController.createPresident);

router.put('/:id', isAuthenticated, presidentsController.updatePresident);

router.delete('/:id', isAuthenticated, presidentsController.deletePresident);

module.exports = router;
