// https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript

module.exports = (req, res, next) => {
  const { email } = req.body;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) return res.status(400).json({ message: 'O campo "email" é obrigatório' });

  if (!regexEmail.test(email)) { 
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
  }

  next();
};
