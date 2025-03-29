const { Pool } = require("pg");
require("dotenv").config(); 

const pool = new Pool({
  user: process.env.DB_USER || "myuser",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "carbon_db",
  password: String(process.env.DB_PASSWORD || "mypassword"), 
  port: process.env.DB_PORT || 5432
});

module.exports = pool;