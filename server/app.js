// Node Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');

app.set('port', 5000);

app.use(bodyParser.urlencoded({extended: true}));

// Data
var cats = ['Kris', 'Luna', 'Rubio'];

//ROUTES
app.get('/felines', function(req, res) {
  res.send(cats);
});

app.post('/felines', function(req, res) {
  cats.push(req.body.catName);
  res.send(true);
});

app.use('/', index);





app.listen(app.get('port'), function() {
  console.log('Server is ready on port:' + app.get('port'));
});
