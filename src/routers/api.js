const express = require('express');

const emailsRouter = require('./emails');

const router = express.Router();

router.use('/emails', emailsRouter);

module.exports = router;
