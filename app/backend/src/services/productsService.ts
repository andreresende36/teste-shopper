import productsModel from '../models/productsModel';
import { ProductToUpdate } from '../Interfaces/product';

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const findByCode = async (code: number) => {
  const product = await productsModel.findByCode(code);
  if (!product || product.length === 0) {
    return { type: 404, message: 'Código de produto não encontrado' };
  }
  return product;
};

const update = async (productsToUpdate: ProductToUpdate[]) => {
  await productsModel.update(productsToUpdate);
};

export default {
  getAll,
  update,
  findByCode,
};
