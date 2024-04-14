import productsModel from '../models/productsModel';
import { ProductToUpdate } from '../Interfaces/product';

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const update = async (productsToUpdate: ProductToUpdate[]) => {
  await productsModel.update(productsToUpdate);
};

export default {
  getAll,
  update,
};
