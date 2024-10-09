const { Pool } = require("pg");
require("dotenv").config();

// PostgreSQL connection pool
const pool = new Pool({
  user: "translation_app_z0qh_user",
  host: "dpg-cro3r3u8ii6s73f2fsgg-a",
  database: "translation_app_z0qh",
  password: "djGa9PBrauKPvNu0wA6rpHBTuhkY5VUr",
  port: 5432,
});
module.exports = pool;
