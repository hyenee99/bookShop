// Get the client
const mysql = require('mysql2');

// Create the connection to database

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Bookshop',
  port: '3307',// mariadb 포트 번호 3307로 변경했음
  dateStrings: true
});

module.exports = conn;