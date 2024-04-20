import camelize = require('camelize');
import { RowDataPacket } from 'mysql2';
import connection from './connection';

const getAll = async () => {
  const [packs] = await connection.execute('SELECT * FROM shopper.packs');
  return camelize(packs);
};

const findByCode = async (code: number) => {
  const [product] = await connection.execute(
    'SELECT * FROM shopper.packs WHERE pack_id = ?;',
    [code],
  );
  return (camelize(product) as unknown as RowDataPacket[]);
};

export default {
  getAll,
  findByCode,
};
