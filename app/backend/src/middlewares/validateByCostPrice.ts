import { Request, Response, NextFunction } from 'express';
import { Product, ProductToUpdate } from '../Interfaces/product';
import productsModel from '../models/productsModel';

const getCostPrice = async (code: number): Promise<number> => {
  const product = (await productsModel.findByCode(code)) as Product;
  return Number(product.costPrice);
};

const comparePrices = async (productsToUpdate: ProductToUpdate[]) => {
  const costPricePromises = productsToUpdate.map(async (item) => {
    const { code } = item;
    return getCostPrice(code);
  });

  const costPrices = await Promise.all(costPricePromises);

  const notValidProducts: number[] = [];
  productsToUpdate.forEach((item, index) => {
    const { newPrice } = item;
    if (newPrice < costPrices[index]) {
      notValidProducts.push(item.code);
    }
  });

  return notValidProducts;
};

const validateByCostPrice = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const notValidProducts = await comparePrices(req.body);
  if (notValidProducts.length === 1) {
    return res.status(422).json({
      // eslint-disable-next-line max-len
      message: `O produto com o código ${notValidProducts.join(', ')} não pode ser atualizado. O novo preço está abaixo do preço de custo. Faça as alterações necessárias e tente novamente.`,
    });
  } if (notValidProducts.length > 1) {
    return res.status(422).json({
      // eslint-disable-next-line max-len
      message: `Os produtos com os códigos ${notValidProducts.join(', ')} não podem ser atualizados. Os novos preços estão abaixo do preço de custo. Faça as alterações necessárias e tente novamente.`,
    });
  }
  return next();
};

export default validateByCostPrice;
