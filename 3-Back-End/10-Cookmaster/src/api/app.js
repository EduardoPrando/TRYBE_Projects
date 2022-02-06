const express = require('express');
const router = require('../routes/index');
const errorHandler = require('../middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/', (request, response) => {
  response.send();
});
app.use(router);
app.use(errorHandler);

module.exports = app;
