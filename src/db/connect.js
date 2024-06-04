import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const pool = mysql
  .createPool({
    host: "localhost",
    database: "carbonprint",
    user: "root",
    password: "vipera_FS10",
  })
  .promise();
