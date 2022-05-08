"use strict"
//모듈
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
dotenv.config();

const app = express();

// 라우팅
const { Server } = require('http');
const { sequelize } = require('./models/index'); //시퀄라이즈

//서버 실행시 MYSQL과 연결
sequelize.sync({ force: false }) // 서버 실행시마다 테이블을 재생성 할 건지에 대한 여부
  .then(() => {
    console.log('서버가동');
  })
  .catch((err) => {
    console.error(err);
  });

//use > 미들 웨어를 등록해주는 메서드  - - -미들웨어 밑에 http메서드를 (app.get 같은것들을) 적는게 순서다 .
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);



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


//위치 살펴보기

