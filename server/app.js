var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var helmet = require('helmet');
var cors = require('cors');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(helmet());
app.use(helmet.noCache());
app.use(cors());

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

module.exports = app;
