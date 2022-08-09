'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];

const User = require('./user');
const Cart = require('./cart');
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file));(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


// db 객체에 모델을 담아두기 때문에 앞으로 db 객체를 require 해서 User, Cart 모델에 접근 가능
db.User = User;          
db.Cart = Cart;

// 각 모델의 static.init 메서드 호출, 이게 실행되어야 테이블에 모델로 연결
Cart.init(sequelize);
User.init(sequelize);


User.associate(db);
Cart.associate(db);

// 다른 테이블과의 관계 연결
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
