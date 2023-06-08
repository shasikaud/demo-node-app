const mysql = require('mysql2/promise');
const config = require('../utility/config');

exports.query = async(sql, params) => {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);
    return results;
}
