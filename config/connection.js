let mysql = require("mysql");

let connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "yourRootPassword",
    database: "projectTwo"
  });

  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });
  
  module.exports = connection;