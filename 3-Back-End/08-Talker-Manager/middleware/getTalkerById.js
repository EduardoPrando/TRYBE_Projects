const getTalker = require('../utils/getTalker');

module.exports = (req, res) => {
  const talker = getTalker();
  const { id } = req.params;

  const compareId = talker.find((t) => t.id === Number(id));

  if (!compareId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(200).json(compareId);
};