import { Product } from "../interfaces/product";
import { LineErrors } from "../interfaces/lineErrors";
import { DbProduct } from "../interfaces/dbProduct";

const validateFinancePrices = (
  csvData: Product[],
  dbProducts: DbProduct[],
  lineErrors: LineErrors[]
) => {
  const invalidCodes: LineErrors[] = [];
  const MESSAGE = "Novo preço menor que o preço de custo do produto!";
  
  csvData.forEach((product) => {
    const dbProduct = dbProducts.find((i) => i.code === product.code);
    if (product.newPrice < Number(dbProduct?.costPrice)) {      
      const error = lineErrors.find((i) => i.code === product.code);
      
      if (error) {
        if(!error.message?.includes(MESSAGE)) {
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

export default validateFinancePrices;
