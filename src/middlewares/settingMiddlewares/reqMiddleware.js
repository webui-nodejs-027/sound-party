const express = require('express');
// eslint-disable-next-line import/no-unresolved
const session = require('express-session');
// eslint-disable-next-line import/no-unresolved
const cookieParser = require('cookie-parser');
const passport = require('passport');
const path = require('path');

module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: 'anton',
      resave: true,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 60 * 1000,
        httpOnly: false,
      },
    }),
  );

  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/music', express.static(path.join(__dirname, '../../../music')));
};
