const getTalker = require('../utils/getTalker');

module.exports = (req, res) => {
  const talkers = getTalker();

  return res.status(200).json(talkers);
};
