const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
require('../../../config/passport-config');


module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(session({
    secret: 'anton',
    resave: true,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 60 * 1000,
      httpOnly: false,
    },
  }));

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(passport.initialize());
  app.use(passport.session());
};
