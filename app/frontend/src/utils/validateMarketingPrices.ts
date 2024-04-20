import { Product } from "../interfaces/product";
import { LineErrors } from "../interfaces/lineErrors";
import { DbProduct } from "../interfaces/dbProduct";

const validateMarketingPrices = (
  csvData: Product[],
  dbProducts: DbProduct[],
  lineErrors: LineErrors[]
) => {
  const invalidCodes: LineErrors[] = [];
  const MESSAGE =
    "Reajuste maior ou menor do que 10% do preço atual do produto";
  csvData.forEach((product) => {
    const dbProduct = dbProducts.find((i) => i.code === product.code);
    if (
      Math.abs(product.newPrice - Number(dbProduct?.salesPrice)) >
      Number(dbProduct?.salesPrice) * 0.1
    ) {
      const error = lineErrors.find((i) => i.code === product.code);

      if (error) {
        if (!error.message?.includes(MESSAGE)) {
          error.message?.push(MESSAGE);
        }
      } else {
        invalidCodes.push({
          code: product.code,
          message: [MESSAGE],
        });
      }
    }
  });
  return [...lineErrors, ...invalidCodes];
};

export default validateMarketingPrices;
