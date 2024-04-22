import { Product } from '../Interfaces/product';
import { DbPack } from '../Interfaces/dbPack';
import { PackCost } from '../Interfaces/packCost';

// eslint-disable-next-line max-lines-per-function
async function calculateCostPrice(
  packs: DbPack[],
  findByCode: (code: number) => Promise<Product>,
): Promise<PackCost[]> {
  const packCosts: PackCost[] = [];
  const packCostsPromises = packs.map(async (pack) => {
    const product = await findByCode(pack.productId);
    const costPrice = parseFloat(product.costPrice);

    const existingPackCost = packCosts.find((pc) => pc.packId === pack.packId);

    if (existingPackCost) {
      existingPackCost.newCostPrice += costPrice * pack.qty;
    } else {
      packCosts.push({
        packId: pack.packId,
        newCostPrice: costPrice * pack.qty,
      });
    }
  });
  await Promise.all(packCostsPromises);
  return packCosts;
}

export default calculateCostPrice;
