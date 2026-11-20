import pg from "pg";
import logger from "../utils/logger.js";


export const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "sada-al-tahakom-employees",
  password: process.env.PASSWORD_DB,
  port: 5432,
});


const connectionDB = async () => {
  try {
    await db.connect();
    logger.info("PostgreSQL connected ");
  } catch (err) {
    logger.error("DB error:", err.message);
  }
};


export default connectionDB ;