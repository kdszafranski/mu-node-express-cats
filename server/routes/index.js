var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);
  if(file == '/favicon.ioc') {
    res.send('hi');
  }
  res.sendFile(path.join(__dirname, '../public', file));
});

module.exports = router;
