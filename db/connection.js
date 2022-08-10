const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'ProRight50!',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);


module.exports = db;