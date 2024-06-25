const express = require('express');

const emailRouter = require('./emails');

const router = express.Router();

router.use('/emails', emailRouter);

module.exports = router;
