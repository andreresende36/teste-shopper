import { Product } from "./product";

export interface AppContextType {
  csvData: Product[];
  dbProducts: Product[];
  csvFields: string[];
  setCsvData: React.Dispatch<React.SetStateAction<Product[]>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setCsvFields: React.Dispatch<React.SetStateAction<string[]>>;
}