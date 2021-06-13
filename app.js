//importing modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
const route = require('./routes/route');


//connect to mongodb

mongoose.connect('mongodb://192.168.56.101:27017/contactlist');
mongoose.connection.on('connected',function(){
    console.log('Connected to mongodb @ 27017');
});

mongoose.connection.on('error',function(err){
    if(err)
    {
        console.log('Error in database connection : '+err);
    }
});

var app = express();
const port = 3000;


app.use(cors());
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname,'public')));

//routes
app.use('/api',route);
//testing server

/*app.get('/',function(req,res){
    res.send('foobar');
});*/

app.listen(port,function(){
    console.log('server started at port: '+port);
});