import connection from './connection';
import { ProductToUpdate } from '../Interfaces/product';

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM shopper.products');
  return products;
};

const update = async (productsToUpdate: ProductToUpdate[]) => {
  await Promise.all(
    productsToUpdate.map(async (product) => {
      const { code, newPrice } = product;
      await connection.execute(
        'UPDATE shopper.products SET sales_price = ? WHERE code = ?',
        [newPrice, code],
      );
    }),
  );
};

export default {
  getAll,
  update,
};
