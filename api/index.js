const express = require('express');
const bodyParser = require('body-parser');

const swaggerUI = require('swagger-ui-express');

const config = require('../config.js');
const user = require('../api/components/user/network.js');
const auth = require('../api/components/auth/network.js');
const errors = require('../network/errors.js');

const app = express();

app.use(bodyParser.json());

const swaggerDoc = require('./components/openapi.json');

// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

// middleware de errores
app.use(errors);

app.listen(config.api.port, () => {
  console.log('Api escuchando en el puerto ', config.api.port);
});