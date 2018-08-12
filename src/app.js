const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const accountData = fs.readFileSync(path.join(__dirname, 'json/accounts.json'), 'utf8');
const userData = fs.readFileSync(path.join(__dirname, 'json/users.json'), 'utf8');

const accounts = JSON.parse(accountData);
const users = JSON.parse(userData);

app.get('/', (request, response) => {
  response.render('index', { title: 'Account Summary', accounts });
});

app.get('/savings', (request, response) => {
  response.render('account', { account: accounts.saving });
});

app.get('/checking', (request, response) => {
  response.render('account', { account: accounts.checking });
});

app.get('/credit', (request, response) => {
  response.render('account', { account: accounts.credit });
});

app.get('/profile', (request, response) => {
  response.render('profile', { user: users[0] });
});

app.get('/transfer', (request, response) => {
  response.render('transfer');
});

app.post('/transfer', (request, response) => {
  accounts[request.body.from].balance = accounts[request.body.from].balance - request.body.amount;
  accounts[request.body.to].balance = parseInt((accounts[request.body.to].balance + request.body.amount), 10);

  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

  response.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (request, response) => {
  response.render('payment', { account: accounts.credit })
});

app.post('/payment', (request, response) => {
  accounts.credit.balance = parseInt((accounts.credit.balance - request.body.amount), 10);
  accounts.credit.available = parseInt((accounts.credit.available + request.body.amount), 10);
  const accountsJSON = JSON.stringify(accounts);
  fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

  response.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
