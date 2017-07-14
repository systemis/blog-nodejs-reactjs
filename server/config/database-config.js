var mysql = require('mysql');

module.exports = mysql.createConnection({
  connectionLimit: 100,
  host: 'db4free.net',
  port: 3307,
  user: 'systemis_blog_dt',
  password: 'systemis_blog',
  database: 'systemis_blog_dt',
})


// var pg = require('pg');
// var config = {
//   user: '__', //env var: PGUSER
//   database: '__', //env var: PGDATABASE
//   password: '__', //env var: PGPASSWORD
//   host: '__', // Server hosting the postgres database
//   port: 5432, //env var: PGPORT
//   max: 10000, // max number of clients in the pool
//   idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
// }
// var pool = new pg.Pool(config);
// module.exports = pool;