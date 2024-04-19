import { Product } from "../interfaces/product";

const validateCodes = (csvData: Product[]) => {
  const productCodes = new Set<number>();
  const invalidCodes: number[] = [];

  csvData.forEach((product) => {
    if (isNaN(product.code) || productCodes.has(product.code)) {
      if (!invalidCodes.includes(product.code)) {
        invalidCodes.push(product.code);
      }
    } else {
      productCodes.add(product.code);
    }
  });
  return invalidCodes;
};

export default validateCodes;
