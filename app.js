var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan')
var fs = require('fs');
var io = require('socket.io')

var app = express();

// Template View Engine (.ejs -> .html)
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Binding socket.io to express app
var socketio = io()
app.io = socketio


// Dynamic controllers load
fs.readdirSync('./routes').forEach(function (file) {
    if (file.substr(-3) == '.js') {
        route = require('./routes/' + file);
        route.controller(app);
    }
});

// Middlewares
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;