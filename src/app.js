const express = require('express');
const app = express();
const auth = require('./middlewares/auth');
const register = require('./routes/register');
const login = require('./routes/login');
const category = require('./routes/categoryRoutes');
const product = require('./routes/productRoutes');
const order = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');


 const logger = require('./middlewares/logger.js');
  const erroHandler = require('./middlewares/erroHandler.js');
const sequelize = require('./config/database');
const { swaggerUi, swaggerSpec } = require('./swagger.js');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(logger);
app.use(express.json());
app.use('/login', login);
app.use('/register', register);

app.use(auth);
app.use('/categories', category);
app.use('/users', userRoutes); 
app.use('/products', product);
app.use('/orders', order);
 app.use(erroHandler);


sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });


sequelize.sync({ force: true })
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar modelos:', err);
  });

module.exports = app; 