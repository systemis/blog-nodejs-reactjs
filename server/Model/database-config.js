var pg = require('pg');
var config = {
  user: 'qgntsuanitfodo', //env var: PGUSER
  database: 'd40t3b2nnd8fk8', //env var: PGDATABASE
  password: 'a355298e4036d8086d5c6ad517739d178b09abb4251a0c33ebe49e27d15eb021', //env var: PGPASSWORD
  host: 'ec2-54-204-32-145.compute-1.amazonaws.com', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10000, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
}
var pool = new pg.Pool(config);
module.exports = pool;