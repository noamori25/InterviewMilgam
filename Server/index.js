const express = require('express');
const app = express();
const port = 3000;
const sql = require('mssql');
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

const config = {
    server:'localhost',
    port: 1433,
    database: 'node_js',
    user: 'sa',
    password: '1234'
  
};

sql.connect(config, (err) => {

    if(err) throw err;
});

app.listen(port, () => console.log("server running"));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT');
    next();
});

app.get('/api/users', (req, res) => {
    var request = new sql.Request();
    request.query('select * from users',(err,result) =>{
        console.log(result);
        res.send(result.recordsets);
       
    })
})

app.post('/api/create', (req,res) => {
    try {
        var request = new sql.Request();
        console.log(req.body);
        var first = req.body.first;
        var last = req.body.last;
        var email = req.body.email;
        request.input('first', sql.VarChar, first);
        request.input('last', sql.VarChar, last);
        request.input('email', sql.VarChar, email);
        request.multiple = true;
        request.query(`insert into users values (@first,@last,@email)`, (error, result) => {
            first = ''
            last = ''
            email = ''
            console.log(result);
        });
        res.send('created');
        
    } 
       catch (error) {
        throw error
    }
    
})

app.put('/api/update', (req,res) => {
        var request = new sql.Request();
        console.log(req.body);
        var first = req.body.first;
        var last = req.body.last;
        var email = req.body.email;
        var id = req.body.id;
        request.input('first', sql.VarChar, first);
        request.input('last', sql.VarChar, last);
        request.input('email', sql.VarChar, email);
        request.input('id', sql.Int, id)
        request.multiple = true;
        request.query(`update users set FirstName = @first, LastName = @last, Email = @email
        where Id = @id`);
        res.send(req.body);
})

app.delete('/api/delete/:id', (req,res) => {
    var request = new sql.Request();
    console.log(req.params.id);
    var id = req.params.id;
    request.input('id', sql.Int, id)
    request.query(`delete from users where Id = @id`);
    res.send('deleted');
})




