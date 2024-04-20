import { Product } from "../interfaces/product";
import { LineErrors } from "../interfaces/lineErrors";

const validateCodes = (csvData: Product[]) => {
  const productCodes = new Set<number>();
  const invalidCodes: LineErrors[] = [];

  csvData.forEach((product) => {
    if (isNaN(product.code) || productCodes.has(product.code)) {
      if (!invalidCodes.some((i) => i.code)) {      
        invalidCodes.push({
          code: product.code,
          message: ['Código de produto inválido ou repetido!']
        });
      }
    } else {
      productCodes.add(product.code);
    }
  });
  return invalidCodes
};

export default validateCodes;
