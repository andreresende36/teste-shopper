import { Request, Response } from 'express';
import packsService from '../services/packsService';
import { ResponseInterface } from '../Interfaces/response';

const getAll = async (_req: Request, res: Response) => {
  const products = await packsService.getAll();
  return res.status(200).json(products);
};

const findByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  const product = await packsService.findByCode(Number(code)); // Convert code to a number
  const { type = undefined, message = undefined } = product as ResponseInterface;
  if (type) return res.status(404).json({ message });
  return res.status(200).json(product);
};

export default {
  getAll,
  findByCode,
};
