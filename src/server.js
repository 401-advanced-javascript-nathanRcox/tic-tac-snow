'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require('./error-handlers/500.js');
const notFound = require('./error-handlers/404.js');
const logger = require('./auth/middleware/logger.js');
const authRoutes = require('./routes/routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');

// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);
app.use(authRoutes);

// Catchalls
app.use('*', notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    if (!port) { throw new Error('The port is missing.'); }
    app.listen(port, () => {
      console.log(`Order Up on ${port}`);
    });
  },
};
