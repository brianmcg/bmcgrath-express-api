const express = require('express');

const emailRouter = require('./emails');
const postRouter = require('./posts');

const router = express.Router();

router.use('/emails', emailRouter);
router.use('/posts', postRouter);

module.exports = router;
