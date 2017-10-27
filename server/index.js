if(process.env.LOCAL=true){
  require('dotenv').config({path: '.env.local'});
} else {
  require('dotenv').config(); // defaults to .env
}

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var morgan = require('morgan');
var db = require('./database');
var routes = require('./routes');

// logging middleware
app.use(morgan('dev'));
// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use('/equisat', routes);

db.sync()
.then(function (){
  var server = app.listen(1337, function (){

    console.log('server listening on port 1337');
  });
});

module.exports = app;
