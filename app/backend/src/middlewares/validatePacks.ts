import { Request, Response, NextFunction } from 'express';
import { Product, ProductToUpdate } from '../Interfaces/product';
import productsModel from '../models/productsModel';

const validatePacks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  return next();
};

export default validatePacks;