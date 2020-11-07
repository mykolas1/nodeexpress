const mysql = require('mysql');

const express= require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json);

var mySqlConnection = mysql.createConnection({
    host: "randomlion.mysql.database.azure.com",
    user: "randomlion@randomlion",
    password: "Macbookpro12321",
    database: "guest",
    port: 3306,
    ssl:true
});

mySqlConnection.connect((err)=> {
    if(!err)
        console.log('LOGIN SUCCESS');
    else
        console.log('LOGIN ERROR: ' + JSON.stringify(err,undefined,2));
})

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
  })

app.get('/e', (res, req)=> {
    console.log('HIT');
    res.send('HIT');
    // mySqlConnection.query('SELECT * FROM employee', (err, rows, fields)=> {
    //     if(!err)
    //         console.log(rows);
    //     else
    //         console.log(err);
    // });
})