var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mustache = require('mustache-express');
var indexRouter = require('./routes/index');

var app = express();

app.use(require('./routes'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.engine('mustache', mustache());
app.set('view engine', __dirname + '/views');
app.engine('mst', mustache('./views/partials', '.mst'));


//app.use('/', indexRouter);

module.exports = app;