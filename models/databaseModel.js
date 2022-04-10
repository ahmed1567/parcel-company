const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database:'parcel_company'
});


module.exports={
    con:con
}