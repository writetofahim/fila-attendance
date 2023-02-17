const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
});
module.exports = {
  query: (sql, callback) => {
    connection.query(sql, callback);
  },
};
