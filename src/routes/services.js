const express = require('express');
const { accounts, writeJSON } = require('../data');

const router = express.Router();

router.get('/transfer', (request, response) => {
  response.render('transfer');
});

router.post('/transfer', (request, response) => {
  accounts[request.body.from].balance = accounts[request.body.from].balance - request.body.amount;
  accounts[request.body.to].balance = parseInt((accounts[request.body.to].balance + request.body.amount), 10);

  writeJSON();

  response.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (request, response) => {
  response.render('payment', { account: accounts.credit })
});

router.post('/payment', (request, response) => {
  accounts.credit.balance = parseInt((accounts.credit.balance - request.body.amount), 10);
  accounts.credit.available = parseInt((accounts.credit.available + request.body.amount), 10);
  
  writeJSON();

  response.render('payment', { message: "Payment Successful", account: accounts.credit });
});

module.exports = router;
