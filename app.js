var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb+srv://chandru:chanMongoDB@cluster0-k2bgr.mongodb.net/test?retryWrites=true', { useNewUrlParser: true })
    .then(() => console.log('connection succesful'))
    .catch((err) => console.error(err));

var employees = require('./routes/employeeRoutes');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', employees);


const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))