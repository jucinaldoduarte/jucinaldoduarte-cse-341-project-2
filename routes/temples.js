const express = require('express');
const router = express.Router();

const templesController = require('../controllers/temples');
const validation = require('../middleware/validate');

router.get('/', templesController.getAll);

router.get('/:id', templesController.getSingle);

router.post('/', validation.saveTemples, templesController.createTemple);

router.put('/:id', validation.saveTemples, templesController.updateTemple);

router.delete('/:id', templesController.deleteTemple);

module.exports = router;
