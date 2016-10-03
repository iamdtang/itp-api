require('dotenv').config();
const Sequelize = require('sequelize');

const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = process.env;

module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST
});
