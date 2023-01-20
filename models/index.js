'use strict';

import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
import Sequelize, { DataTypes } from 'sequelize';
const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);
const db = {};

import User, { init, associate } from './user';
import Production, { init as _init, associate as _associate } from './production';
import Review, { init as __init, associate as __associate } from './review';

// db 객체에 모델을 담아두기 때문에 앞으로 db 객체를 require 해서 User 모델에 접근 가능
db.User = User;          
db.Production = Production;
db.Review = Review;

readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(join(__dirname, file));(sequelize, DataTypes);
    model["init"](sequelize)
    db[model.name] = model;
    
  });

Object.keys(db).forEach(modelName => {
  db[modelName].init(sequelize)
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
});

// 각 모델의 static.init 메서드 호출, 이게 실행되어야 테이블에 모델로 연결
init(sequelize);
_init(sequelize);
__init(sequelize);

// 다른 테이블과의 관계 연결
associate(db);
__associate(db);
_associate(db);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
