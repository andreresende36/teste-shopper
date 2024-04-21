import { RowDataPacket } from 'mysql2';
import camelize = require('camelize');
import connection from './connection';
import { Product, ProductToUpdate } from '../Interfaces/product';
import packsModels from './packsModels';
import { DbPack } from '../Interfaces/dbPack';
import calculateCostPrice from '../utils/calculateCostPrice';

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
const updateSalesPrice = async (productsToUpdate: ProductToUpdate[]) => {
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

const updateCostPricePacks = async (productsToUpdate: ProductToUpdate[]) => {
  const packs = (await packsModels.getAll()) as unknown as DbPack[];
  const packsToUpdate = packs.filter((pack) =>
    productsToUpdate.some((product) => product.code === pack.packId));
  const packsWithNewCostPrice = await calculateCostPrice(
    packsToUpdate,
    findByCode as (code: number) => Promise<Product>,
  );
  await Promise.all(
    packsWithNewCostPrice.map(async (product) => {
      const { packId, newCostPrice } = product;
      await connection.execute(
        'UPDATE shopper.products SET cost_price = ? WHERE code = ?',
        [newCostPrice, packId],
      );
    }),
  );
};

const update = async (productsToUpdate: ProductToUpdate[]) => {
  await updateSalesPrice(productsToUpdate);
  await updateCostPricePacks(productsToUpdate);
};

export default {
  getAll,
  findByCode,
  update,
};
