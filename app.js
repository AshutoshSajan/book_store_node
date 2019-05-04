// all dependencies packages
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var authController = require('./controllers/authController');
var flash = require('connect-flash');
var passport = require('passport');

var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var authorRouter = require('./routes/authors');
var userRouter = require('./routes/users');
var cartRouter = require('./routes/cart')
var authRouter = require('./routes/auth');

// mongoose connect with mongodb database
mongoose.connect("mongodb://localhost/bookList", { useNewUrlParser: true }, (err) => {
	err ? console.log(err, 'not connected to mongodb') : console.log('Successfully connected to mongodb');
})

//passport require
require('./module/passport');

// database models
require('./models/Author');
require('./models/Book');
require('./models/User');
require('./models/Cart');
require('./models/Product');


// router files

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(authController.sessions);
app.use(authController.googleSessions);

app.use('/books', booksRouter);
app.use('/authors', authorRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/cart', cartRouter);
// app.use('/product', cartRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
