import camelize = require('camelize');
import connection from './connection';

const getAll = async () => {
  const [packs] = await connection.execute('SELECT * FROM shopper.packs');
  return camelize(packs);
};

export default {
  getAll,
};
