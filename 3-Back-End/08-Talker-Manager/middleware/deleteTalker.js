const fs = require('fs');
const getTalker = require('../utils/getTalker');

module.exports = (req, res) => {
  const { id } = req.params;
  const talkers = getTalker();

  const filterId = talkers.filter((t) => t.id !== Number(id));

  console.log(filterId);

  fs.writeFileSync('./talker.json', JSON.stringify(filterId));
  return res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
};