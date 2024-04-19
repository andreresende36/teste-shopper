import { Product } from "../interfaces/product";

const validatePrices = (csvData: Product[]) => {
  const invalidPrices: number[] = [];
  csvData.forEach((product) => {
    if (isNaN(product.newPrice)) {
      invalidPrices.push(product.code);
    }
  });
  return invalidPrices;
};

export default validatePrices;