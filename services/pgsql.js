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
 
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'admin',
    port: 5432,
})
 
await client.connect()
const resp = await client.query('SELECT * FROM users');
const rows = resp.rows;
console.log(rows)
 
await client.end()