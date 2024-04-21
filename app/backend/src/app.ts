import express = require('express');
import cors = require('cors');

import { Request, Response } from 'express';
import productsRoutes from './routes/products.routes';
import packsRoutes from './routes/packs.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_request: Request, response: Response) => {
  response.send({
    message: 'OK',
  });
});

app.use('/products', productsRoutes);
app.use('/packs', packsRoutes);

export default app;
