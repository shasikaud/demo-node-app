require('dotenv').config();

const ENV_MYSQL_HOST = process.env.MYSQL_HOST;
const ENV_MYSQL_USER = process.env.MYSQL_USER;
const ENV_MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const ENV_MYSQL_DB = process.env.MYSQL_DB;

const config = {
    db: {
        host: ENV_MYSQL_HOST,
        user: ENV_MYSQL_USER,
        password: ENV_MYSQL_PASSWORD,
        database: ENV_MYSQL_DB,
    }
};

module.exports = config;