const express = require('express'),
mainRouter = express(),
authRouter = require('./api/auth'),
scrapRouter = require('./api/scraper')

mainRouter.use('/auth', authRouter);
mainRouter.use('/', scrapRouter);

module.exports = mainRouter