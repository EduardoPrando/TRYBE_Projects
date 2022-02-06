const fs = require('fs');
const getTalker = require('../utils/getTalker');

module.exports = (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = getTalker();
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk,
  };

  talkers.push(newTalker);

  fs.writeFileSync('./talker.json', JSON.stringify(talkers));
  
  res.status(201).json(newTalker);
};
