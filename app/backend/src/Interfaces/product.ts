export interface Product {
  code: number;
  name: string;
  costPrice: string;
  salesPrice: string;
}

export interface ProductToUpdate {
  code: number,
  newPrice: number
}
