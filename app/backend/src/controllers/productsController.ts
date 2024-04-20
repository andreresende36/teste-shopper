import { Request, Response } from 'express';
import productsService from '../services/productsService';
import { ProductToUpdate } from '../Interfaces/product';
import { ResponseInterface } from '../Interfaces/response';

const getAll = async (_req: Request, res: Response) => {
  const products = await productsService.getAll();
  return res.status(200).json(products);
};

const findByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const product = await productsService.findByCode(Number(code)); // Convert code to a number
  const { type = undefined, message = undefined } = product as ResponseInterface;
  if (type) return res.status(404).json({ message });
  return res.status(200).json(product);
};

const update = async (req: Request, res: Response) => {
  const productsToUpdate: ProductToUpdate[] = req.body;
  await productsService.update(productsToUpdate);
  return res.status(200).json({ message: 'OK' });
};

export default {
  getAll,
  update,
  findByCode,
};
