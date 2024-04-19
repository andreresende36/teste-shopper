import { Request, Response, NextFunction } from 'express';
import { Product, ProductToUpdate } from '../Interfaces/product';
import productsModel from '../models/productsModel';

const getSalesPrice = async (code: number): Promise<number> => {
  const product = (await productsModel.findByCode(code)) as Product;
  return Number(product.salesPrice);
};

const comparePrices = async (productsToUpdate: ProductToUpdate[]) => {
  const salesPricePromises = productsToUpdate.map(async (item) => {
    const { code } = item;
    return getSalesPrice(code);
  });

  const salesPrices = await Promise.all(salesPricePromises);

  const notValidProducts: number[] = [];
  productsToUpdate.forEach((item, index) => {
    const { newPrice } = item;
    if (Math.abs(newPrice - salesPrices[index]) > salesPrices[index] * 0.1) {
      notValidProducts.push(item.code);
    }
  });

  return notValidProducts;
};

const validateBySalesPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notValidProducts = await comparePrices(req.body);
  if (notValidProducts.length === 1) {
    return res.status(422).json({
      // eslint-disable-next-line max-len
      message: `O produto com o código ${notValidProducts.join(', ')} não pode ser atualizado. O novo preço é maior ou menor que 10% do preço atual. Faça as alterações necessárias e tente novamente.`,
    });
  } if (notValidProducts.length > 1) {
    return res.status(422).json({
      // eslint-disable-next-line max-len
      message: `Os produtos com os códigos ${notValidProducts.join(', ')} não podem ser atualizados. Os novos preços são maiores ou menores que 10% do preços atuais. Faça as alterações necessárias e tente novamente.`,
    });
  }
  return next();
};

export default validateBySalesPrice;
