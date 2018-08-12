const express = require('express');
const { accounts } = require('../data');

const router = express.Router();

router.get('/savings', (request, response) => {
  response.render('account', { account: accounts.saving });
});

router.get('/checking', (request, response) => {
  response.render('account', { account: accounts.checking });
});

router.get('/credit', (request, response) => {
  response.render('account', { account: accounts.credit });
});

module.exports = router;
