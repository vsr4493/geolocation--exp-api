const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const config = require('./config/config');
const routesConfig = require('./config/routes');
const bodyParser = require('body-parser');

const app = express();
console.log('here');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// connect to database
mongoose.set('debug', true);
mongoose.connect(
  config.db,
  err => {
    if (err) {
      console.log(`[MongoDB] Failed to connect. ${err}`);
    } else {
      console.log(`[MongoDB] connected: ${config.db}`);
      console.log('Setting up');

      // initialize api
      routesConfig(app);

      // start server
      app.listen(config.apiPort, () => {
        console.log(`[Server] listening on port ${config.apiPort}`);
      });
    }
  }
);

module.exports = app;
