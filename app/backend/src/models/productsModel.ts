import { RowDataPacket } from 'mysql2';
import camelize = require('camelize');
import connection from './connection';
import { ProductToUpdate } from '../Interfaces/product';

const getAll = async () => {
  const [products] = await connection.execute('SELECT * FROM shopper.products');
  return camelize(products);
};

const findByCode = async (code: number) => {
  const [product] = await connection.execute(
    'SELECT * FROM shopper.products WHERE code = ?;',
    [code],
  );
  return (camelize(product) as unknown as RowDataPacket[])[0];
};

const update = async (productsToUpdate: ProductToUpdate[]) => {
  console.log(productsToUpdate);
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
  findByCode,
  update,
};
