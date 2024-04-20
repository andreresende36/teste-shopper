import { Product } from "../interfaces/product";
import { LineErrors } from "../interfaces/lineErrors";

const validateTypePrices = (
  csvData: Product[],
  lineErrors: LineErrors[]
) => {
  const invalidCodes: LineErrors[] = [];
  const MESSAGE = "Preço inválido!";
  csvData.forEach((product) => {
    if (isNaN(product.newPrice)) {
      const error = lineErrors.find((i) => i.code === product.code);
      const index = lineErrors.indexOf(error as LineErrors);
      if (error && !error.message?.includes(MESSAGE)) {
        lineErrors[index].message?.push(MESSAGE);
      } else {
        invalidCodes.push({
          code: product.code,
          message: [MESSAGE],
        });
      }
    }
  });
  return [...lineErrors, ...invalidCodes]
};

export default validateTypePrices;
