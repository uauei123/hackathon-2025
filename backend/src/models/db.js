const { Pool } = require("pg");
require("dotenv").config(); // Assicura che le variabili d'ambiente vengano caricate

const pool = new Pool({
  user: process.env.DB_USER || "myuser",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "carbon_db",
  password: String(process.env.DB_PASSWORD || "mypassword"), // Forza il valore a stringa
  port: process.env.DB_PORT || 5432
});

module.exports = pool;