const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const session = require('express-session');

const PORT = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 
  extended: true 
}));
app.use(express.static('public'));

// Routing:
require('./route/routes')(app);

app.use((err, req, res, next) => {
  res.end(`Problem: (${typeof err !== 'undefined' ? err : "Unknown"})`);
  console.log(err);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});