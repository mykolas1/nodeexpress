const mysql = require('mysql');
const cors = require('cors');

const bodyparser = require('body-parser');

const express= require('express');
const bodyParser= require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('trust proxy', true);
app.use(cors());

app.listen(8080, function() {
    console.log('listening on 8080')
  })

  app.get('/employees', cors(), function (req, res) {
    mySqlConnection.query('SELECT * FROM employee', (err, rows, fields)=> {
        if(!err) {
            console.log(rows);
            res.send(rows);
        }
        else
            console.log(err);
    });
  });
  
  app.get('/test', cors(), function (req, res) {
    res.send("TEST IS GOOD");
  });

  app.post('/employee', cors(), (req, res) => {
    console.log('post');
    mySqlConnection.query('INSERT INTO employee (Name, EmpCode, Salary) VALUES (?, ?, ?);', [req.body.name, req.body.empCode, req.body.salary], 
      		function (err, results, fields) {
      			if (err) throw err;
			else console.log('Inserted ' + results.affectedRows + ' row(s).');
	   	})
    res.sendStatus(200);
  });

  app.put('/employee/update', cors(), (req, res) => {
    console.log('update');
    console.log(req.body);
    mySqlConnection.query('UPDATE employee SET Name = ?, EmpCode = ?, Salary = ? WHERE EmpID = ?', [req.body.name, req.body.empCode, req.body.salary, req.body.id], 
			function (err, results, fields) {
				if (err) throw err;
				else console.log('Updated ' + results.affectedRows + ' row(s).');
	});
    res.sendStatus(200);
  });

  app.delete('/employee/:id/delete', cors(), (req, res) => {
    console.log('delete');
    mySqlConnection.query('DELETE FROM employee WHERE EmpID = ?', [req.params.id], 
			function (err, results, fields) {
				if (err) throw err;
				else console.log('Deleted ' + results.affectedRows + ' row(s).');
	});
    res.sendStatus(200);
  });

var mySqlConnection = mysql.createConnection({
    host: "35.228.202.115",
    user: "root",
    password: "Macbookpro12321",
    database: "guest",
    port: 3306,
    ssl:true
});

mySqlConnection.connect((err)=> {
    if(!err) {
        console.log('LOGIN SUCCESS');
    }
    else
        console.log('LOGIN ERROR: ' + JSON.stringify(err,undefined,2));
});

