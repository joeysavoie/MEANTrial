//Import Modules 
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const bluebird = require('bluebird');

const app = express();

//App Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const api = require('./routes/api.route');

//Passes the mongoose promise on to Bluebird
mongoose.Promise = bluebird;

//Creates the database connection
mongoose.connect('mongodb://admin:SvJ6TmZSd0ZdgK1M@restful-api-shard-00-00-saead.mongodb.net:27017,restful-api-shard-00-01-saead.mongodb.net:27017,restful-api-shard-00-02-saead.mongodb.net:27017/test?ssl=true&replicaSet=Restful-API-shard-0&authSource=admin'
/* Deprecated no longer needed to be used.
,{useMongoClient: true}*/)
.then(()  => { 
  console.log(`Succesfully Connected to the Mongodb Database Atlas`)
})
.catch(error => {
  console.log(error);
  console.log(`Error Connecting to the Mongodb Database`)
});

//Handles the CORS Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes which should handle requests and direct them
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;