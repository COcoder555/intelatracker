const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  port:3306,
  // Your username
  user: "root",
  // Your password
  password: "password",
  database: "personneldb"
});
connection.connect(function (err) {
  if (err) throw err;
});
module.exports = connection;