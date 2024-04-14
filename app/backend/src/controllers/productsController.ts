import { Request, Response } from 'express';
import productsService from '../services/productsService';
import { ProductToUpdate } from '../Interfaces/product';

const getAll = async (_req: Request, res: Response) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const update = async (req: Request, res: Response) => {
  const productsToUpdate: ProductToUpdate[] = req.body;
  await productsService.update(productsToUpdate);
  return res.status(204).json();
};

export default {
  getAll,
  update,
};
