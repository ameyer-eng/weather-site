var createError = require('http-errors');
const express = require('express');
const hbs = require('hbs');
const path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




const app = express();


const indexRouter = require('./routes/index');
const chemical= require('./routes/chemicals');
const breeds = require('./routes/breeds');
const images = require('./routes/images');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'partials'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chemical', chemical);
app.use('/breeds', breeds);
app.use('/images', images);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;