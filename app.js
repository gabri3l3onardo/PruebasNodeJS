var express = require('express');
var http = require('http');
var https = require('https');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var users = require('./routes/user');
var tweets = require('./routes/tweet');

var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.methodOverride());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password: 'root',
        port: '3306',
        database: 'nodejs'
    },'request')
);

app.get('/', routes.index);
app.get('/users', users.list);

app.get('/tweets', tweets.enlista);
app.post('/users/add',users.salvar);

app.get('/users/:id',users.getId);

app.use(app.router);

http.createServer(app).listen(app.get('port'),'10.200.82.185', function(){
    console.log('Express server listening on port '+app.get('port'));
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;