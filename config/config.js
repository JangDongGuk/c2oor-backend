require('dotenv').config();

const env = process.env;

const development = {
    username  : env.DB_USER,
    password  : env.DB_PASSWORD,
    database  : env.DB_DATABASE,
    host      : env.DB_HOST,
    port      : parseInt(env.DB_PORT), 
    dialect   : "mysql",
    timezone  : "+09:00",
    dialectOptions:{ "dateStrings":true, useUTC: false, "typeCast":true }
};

module.exports = { development };