import pkg from 'pg';
const { Pool, Client } = pkg;
 
// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'admin',
//   port: 5432,
// })
 
// console.log(await pool.query('SELECT NOW()'))

class PostgreSQLConnection {

    connect() {
        this.client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'admin',
            port: 5432,
        })
        this.client.connect();
    }

    getConnection() {
        return this.client;
    }
}

const db = new PostgreSQLConnection();
await db.connect();
const client = db.getConnection();
 

try {
    const res = await client.query(query);
    console.log('Table is successfully created');
} catch (err) {
    console.log(err.stack);
} finally {
    client.close();
}

// https://www.digitalocean.com/community/tutorials/how-to-use-postgresql-with-node-js-on-ubuntu-20-04