const express = require('express');
const router = express.Router();

const templesController = require('../controllers/temples');

const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', templesController.getAllTemples);

router.get('/:id', templesController.getSingleTemple);

router.post('/', isAuthenticated, templesController.createTemple);

router.put('/:id', isAuthenticated, templesController.updateTemple);

router.delete('/:id', isAuthenticated, templesController.deleteTemple);

module.exports = router;
