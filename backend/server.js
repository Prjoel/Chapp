const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const handleSocket = require('./routes/socketEvents');
const session = require('express-session');
const passport = require('passport');
const { signupRouter, loginRouter, logoutRouter, changePasswordRouter } = require('./routes/authRouters');
const userRouter = require('./routes/userRouter');
const { isAuthorized } = require('./routes/middleware');
const path = require('path');

// Config...
const PORT = process.env.PORT || 8000;

const corsOptions = {
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // Valid for a week.
  }
}));
app.use(passport.initialize());
app.use(passport.session());
// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.use(express.static(path.join(__dirname, 'client', 'build'), { index: false })); // second argument makes express avoid sending a default index.* file.

app.use(isAuthorized);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use('/user', userRouter);
app.use('/logout', logoutRouter);
app.use('/changePassword', changePasswordRouter);

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(500).send('Something broke!')
})

handleSocket(app, PORT)


