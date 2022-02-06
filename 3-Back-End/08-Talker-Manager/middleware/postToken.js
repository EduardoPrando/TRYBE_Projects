// const { v4: uuidv4 } = require('uuid');
//   const token = uuidv4().toString().replaceAll('-', '').slice(16);
// base code https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript

module.exports = (req, res) => {
  const randomCode = () => Math.random().toString(36).substring(2);

  const token = (randomCode() + randomCode()).substring(0, 16);

  return res.status(200).json({ token });
};
