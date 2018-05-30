const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./models/User');
require('./services/passport');


// CONNECT TO MONGO COLLECTION
mongoose.connect(keys.mongoURI);


//RUN EXPRESS APP
const app = express();

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

//THIS RETURNS A FUNCTION FROM AUTHROUTES MODULE EXPORT WHICH IS CALLED WITH (app)
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log('App running on port 5000'));
