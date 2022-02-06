const fs = require('fs');
const getTalker = require('../utils/getTalker');

module.exports = (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const editedTalker = {
    id: Number(id),
    name,
    age,
    talk,
  };
  const talker = getTalker();
  
  const editedTalkers = talker.map((t) => (t.id === Number(id) ? editedTalker : talker));

  fs.writeFileSync('./talker.json', JSON.stringify(editedTalkers));
  return res.status(200).json(editedTalker);
};
