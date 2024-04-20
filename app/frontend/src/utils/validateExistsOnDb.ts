import { DbProduct } from "../interfaces/dbProduct";
import { Product } from "../interfaces/product";
import { LineErrors } from "../interfaces/lineErrors";

const validateExistsOnDb = (
  csvData: Product[],
  dbProducts: DbProduct[],
  lineErrors: LineErrors[]
) => {
  // const invalidCodes: LineErrors[] = [];
  // csvData.forEach((product) => {
  //   if (!dbProducts.some((i) => i.code === product.code))
  //     invalidCodes.push({
  //       code: product.code,
  //       message: ["Produto não encontrado no banco de dados!"],
  //     });
  // });
  // return [...lineErrors, ...invalidCodes];

  const invalidCodes: LineErrors[] = [];
  const MESSAGE =
  "Produto não encontrado no banco de dados!";
  csvData.forEach((product) => {
    const dbProduct = dbProducts.find((i) => i.code === product.code);
    if (!dbProduct) {
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

export default validateExistsOnDb;
