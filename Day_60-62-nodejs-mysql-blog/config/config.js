const dotenv = require('dotenv');

dotenv.config();

const mysqlConfig = {
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DB,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
}

module.exports = {
  databaseConfig: mysqlConfig,
  port: process.env.PORT || 3000,
}