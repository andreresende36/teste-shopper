import { CsvProduct } from "./csvProduct";
import { DbProduct } from "./dbProduct";
import { DbPack } from "./dbPack";

export interface AppContextType {
  csvData: CsvProduct[];
  dbProducts: DbProduct[];
  csvFields: string[];
  tableError: string
  dbPacks: DbPack[];
  setCsvData: React.Dispatch<React.SetStateAction<CsvProduct[]>>;
  setDbProducts: React.Dispatch<React.SetStateAction<DbProduct[]>>;
  setCsvFields: React.Dispatch<React.SetStateAction<string[]>>;
  setTableError: React.Dispatch<React.SetStateAction<string>>;
  setDbPacks: React.Dispatch<React.SetStateAction<DbPack[]>>;
}