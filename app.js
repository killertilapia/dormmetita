﻿var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

// passport related
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// mongodb related
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');

var connectToMongoLab = function () {
    //var username = process.env.MongoLabUsername;
    //var password = process.env.MongoLabPassword;
    var username = "jaypax";
    var password = "version1";

    var mongolabUri = "mongodb://" + username + ":" + password + "@ds035448.mongolab.com:35448/dbhaxspace";
    
    var mongooseUri = uriUtil.formatMongoose(mongolabUri);
    var options = {
        server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
        replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
    };
    mongoose.connect(mongooseUri, options);
};

connectToMongoLab();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connectToMongoLab);

// load models
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    if (~file.indexOf('.js')) require(__dirname + '/models/' + file);
});

// Normal routes
var routes = require('./routes/index');
var users = require('./routes/users');

// RESTful routes
var api_v1_posts = require('./routes/api/v1/Posts.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());

// passport config
var Account = require('./models/Account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Map routes
app.use('/', routes);
app.use('/users', users);
app.use('/api/v1/posts',api_v1_posts);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

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
