const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));

// Input validation function
function isMaliciousInput(input) {
  const xssPattern = /<script.*?>.*?<\/script.*?>|javascript:|on\w+=|<.*?on\w+.*?>/gi;
  const sqlPattern = /('|--|;|\b(select|update|delete|insert|drop|union|alter|create)\b)/gi;

  return {
    isXSS: xssPattern.test(input),
    isSQLi: sqlPattern.test(input),
  };
}

app.get('/', (req, res) => {
  res.render('index', { error: null });
});

app.post('/search', (req, res) => {
  const searchTerm = req.body.searchTerm || "";
  const check = isMaliciousInput(searchTerm);

  if (check.isXSS || check.isSQLi) {
    return res.render('index', {
      error: check.isXSS ? 'Possible XSS detected. Input cleared.' :
             check.isSQLi ? 'Possible SQL Injection detected. Input cleared.' :
             'Invalid input.',
    });
  }

  res.render('result', { searchTerm });
});

app.listen(3000, () => console.log('Server running on port 3000'));
