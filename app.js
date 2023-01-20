"use strict"

import createError from 'http-errors';
import express, { json, urlencoded } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import redis from 'redis';

import indexRouter from './routes/index';
import signupRouter from './routes/signup';
import jwtRouter from './routes/jwt';
import production from './routes/production';
import review from './routes/review';

config();

const app = express();

import { Server } from 'http';
import { sequelize } from './models/index';

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
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/', indexRouter);
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

export default app;