const express = require('express');
const bodyParser = require('body-parser');
const getAllTalkers = require('./middleware/getAllTalkers');
const getTalkerById = require('./middleware/getTalkerById');
const postEmail = require('./middleware/postEmail');
const postPassword = require('./middleware/postPassword');
const postToken = require('./middleware/postToken');
const validateToken = require('./middleware/validateTalker/validateToken');
const validateName = require('./middleware/validateTalker/validateName');
const validateAge = require('./middleware/validateTalker/validateAge');
const {
  validateWatchedAt,
  validateRate,
  validateTalks } = require('./middleware/validateTalker/validateTalk');
const createTalker = require('./middleware/createTalker');
const editedTalker = require('./middleware/editedTalker');
const deleteTalker = require('./middleware/deleteTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', postEmail, postPassword, postToken);

app.post('/talker',
validateToken,
validateName,
validateAge,
validateTalks,
validateWatchedAt,
validateRate,
createTalker);

app.put('/talker/:id',
validateToken,
validateName,
validateAge,
validateTalks,
validateWatchedAt,
validateRate,
editedTalker);

app.delete('/talker/:id', validateToken, deleteTalker);
