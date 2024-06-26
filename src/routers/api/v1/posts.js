const express = require('express');
const postsController = require('@controllers/posts');
const bodyParser = require('body-parser')

const jsonParser = bodyParser.json()
const router = express.Router();

router.get('/', jsonParser, postsController.getAll);

router.get('/:id', jsonParser, postsController.getById);

router.post('/', jsonParser, postsController.create);

router.put('/:id',jsonParser, postsController.update);

router.delete('/:id', jsonParser, postsController.delete);

module.exports = router;
