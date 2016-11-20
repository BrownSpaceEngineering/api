var express = require('express');
var app = express();
var routes = require('./routes');
var bodyParser = require('body-parser');
var morgan = require('morgan');


app.use('/', routes);
// logging middleware
app.use(morgan('dev'));
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

var server = app.listen(1337, function(){
  console.log('server listening on port 1337');
})
