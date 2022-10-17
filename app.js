"use strict"

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const redis = require('redis');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const jwtRouter = require('./routes/jwt');
const production = require('./routes/production');
const review = require('./routes/review');

dotenv.config();

const app = express();

const { Server } = require('http');
const { sequelize } = require('./models/index');

 sequelize.sync({ force: false })
  .then(() => {
    console.log(' DB 연결성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/jwt', jwtRouter);
app.use('/production', production);
app.use('/review', review);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;