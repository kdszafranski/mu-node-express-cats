// Node Server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var index = require('./routes/index');

// process.env.PORT is for Heroku
app.set('port', process.env.PORT || 5000);

app.use(bodyParser.urlencoded({extended: true}));

// Data
// Ode to the Rio Olympics
var songs = [{
  artist: "Bruce Springsteen",
  title: "Born in the U.S.A."
}];

//ROUTES
app.get('/songs', function(req, res) {
  // return all songs in our array
  res.send(songs);
});

app.post('/songs', function(req, res) {
  var newSong = {
    artist: req.body.artist,
    title: req.body.title
  };
  // add to our song array
  songs.push(newSong);

  // send "created" HTTP Status code back to client
  res.sendStatus(201);
});

app.use('/', index);

app.listen(app.get('port'), function() {
  console.log('Server is ready on port:' + app.get('port'));
});
