const fs = require('fs');

module.exports = () => {
  const file = fs.readFileSync('./talker.json');
  const parsedFile = JSON.parse(file);
  if (!file || !parsedFile.length) return [];

  return parsedFile;
};