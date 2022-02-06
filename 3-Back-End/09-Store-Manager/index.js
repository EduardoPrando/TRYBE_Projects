const express = require('express');
const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = 3000;
app.use(express.json());

app.get('/', (_request, response) => response.send());
app.use(router);
app.use(errorHandler);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));