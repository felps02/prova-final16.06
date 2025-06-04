const express = require('express');
const app = require('./app');

app.use(express.json());
// ...outros middlewares e configurações...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

