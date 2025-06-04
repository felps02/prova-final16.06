const jwt = require('jsonwebtoken');

const JWT_SECRET = 'sua_chave_secreta'; 

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  console.log('Token recebido:', token);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' + JSON.stringify(err) });
    req.user = user;
    next();
  });
}; 

