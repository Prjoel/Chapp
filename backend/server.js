const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const handleSocket = require('./routes/socketEvents');
const session = require('express-session');
const passport = require('passport');
const { signupRouter, loginRouter, logoutRouter } = require('./routes/authRouters');
const userInfoRouter = require('./routes/userInfoRouter');
const { isAuthorized } = require('./routes/middleware');


const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secreto secreto',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000 // Valid for a week.
  }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use(isAuthorized);
app.use('/logout', logoutRouter);
app.use('/', userInfoRouter);


app.post("/", (req, res) => {
  const value = req.body;
  console.log(value);
  res.sendStatus(201);
});


handleSocket(app, PORT)


