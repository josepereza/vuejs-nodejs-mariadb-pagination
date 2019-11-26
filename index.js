var express = require('express')
var app = express()
var usuarios = require('./routes/usuarios');
const mariadb = require('mariadb');
const bodyParser = require('body-parser')
const path = require('path');
const axios = require('axios');
const cors = require('cors');


var db = mariadb.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'joseceuti2019',
    database: 'seq_db'
})


//app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(express.static(path.join(__dirname, 'node_modules/materialize-css/dist'))); // configure express to use public folder

app.use(cors());
app.use('/api',usuarios);


app.get('/', function (req, res) {
    res.send('holla mundo')
})

//app.get('/', (req, res) => {
  //  res.sendFile(__dirname + '/index.html')
//  })


app.listen(3000);