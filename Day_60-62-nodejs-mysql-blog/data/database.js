const mysql = require('mysql2/promise');

const { databaseConfig } = require('../config/config');

const pool = mysql.createPool(databaseConfig);

module.exports = pool;