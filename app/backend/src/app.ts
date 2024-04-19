import express = require('express');
import cors = require('cors');

import { Request, Response } from 'express';
import productsRoutes from './routes/products.routes';

// import multer from 'multer';
// import validateFile from './utils/validation'; // Implemente esta função para validar o arquivo CSV
// import processFile from './utils/processing'; // Implemente esta função para processar o arquivo CSV

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_request: Request, response: Response) => {
  response.send({
    message: 'OK',
  });
});

app.use('/products', productsRoutes);
// Configuração do multer para upload de arquivos
// const upload = multer({ dest: 'uploads/' });

export default app;
