import express from 'express';
import ProductsController from './controllers/products.controller';
import UsersController from './controllers/users.controller';
import OrdersController from './controllers/orders.controller';
import { nameValid, amountValid } from './middlewares/products.middlewares';
import {
  usernameValid,
  classeValid,
  levelValid,
  passwordValid,
} from './middlewares/users.middlewares';

const app = express();
const productsController = new ProductsController();
const usersController = new UsersController();
const ordersController = new OrdersController();

app.use(express.json());

app.get('/products', productsController.getAll);
app.post('/products', nameValid, amountValid, productsController.createProduct);
app.post(
  '/users',
  usernameValid,
  classeValid,
  levelValid,
  passwordValid,
  usersController.createUser,
);
app.get('/orders', ordersController.getAll);

export default app;
