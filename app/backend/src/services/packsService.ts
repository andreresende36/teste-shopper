import { RowDataPacket } from 'mysql2';
import { ResponseInterface } from '../Interfaces/response';
import packsModel from '../models/packsModels';

const getAll = async () => {
  const products = await packsModel.getAll();
  return products;
};

const findByCode = async (
  code: number,
): Promise<ResponseInterface | RowDataPacket[]> => {
  const product = await packsModel.findByCode(code);
  if (!product || product.length === 0) {
    return { type: 404, message: 'Código de pacote não encontrado' };
  }
  return product;
};

export default {
  getAll,
  findByCode,
};
