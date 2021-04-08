const express = require('express');
const wordRouter = express.Router();
const WordController = require('../controllers/wordController');
console.log('in word routes')

wordRouter.get('/search/:searchString', WordController.searchWord);

module.exports = wordRouter;