import { Product } from "./product";
import { DbProduct } from "./dbProduct";

export interface AppContextType {
  csvData: Product[];
  dbProducts: DbProduct[];
  csvFields: string[];
  tableError: string
  setCsvData: React.Dispatch<React.SetStateAction<Product[]>>;
  setDbProducts: React.Dispatch<React.SetStateAction<DbProduct[]>>;
  setCsvFields: React.Dispatch<React.SetStateAction<string[]>>;
  setTableError: React.Dispatch<React.SetStateAction<string>>;
}