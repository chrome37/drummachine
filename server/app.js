var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/auth', authRouter);

const port = Number.parseInt(process.env.PORT || process.env.VCAP_APP_PORT || '5000');
app.listen(port, '0.0.0.0', () => {
  console.log('server starting on port: ' + port);
});


module.exports = app;
