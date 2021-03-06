const {Sequelize} = require('sequelize');

const db = new Sequelize(process.env.DB_CONNECTIONS_STRING); 

module.exports = db;
