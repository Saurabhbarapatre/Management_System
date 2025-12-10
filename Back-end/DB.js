import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Management",
});

db.connect(function (err) {
  if (err) {
    console.log("Connection failed", err);
    return;
  }

  console.log("Connected");
});

export default db;
