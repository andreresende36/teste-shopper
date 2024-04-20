import React, { useState, useEffect } from 'react';
import { CsvProduct } from '../interfaces/csvProduct';
import { AppContextType } from '../interfaces/AppContextType';
import AppContext from './AppContext';
import { DbProduct } from '../interfaces/dbProduct';
import { DbPack } from '../interfaces/dbPack';
import { LineErrors } from '../interfaces/lineErrors';
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [csvData, setCsvData] = useState<CsvProduct[]>([]);
  const [dbProducts, setDbProducts] = useState<DbProduct[]>([]);
  const [dbPacks, setDbPacks] = useState<DbPack[]>([]);
  const [csvFields, setCsvFields] = useState<string[]>([]);
  const [tableError, setTableError] = useState<string>("");
  const [tableIsEnabled, setTableIsEnabled] = useState(false);
  const [updateIsEnabled, setUpdateIsEnabled] = useState(false);
  const [lineErrors, setLineErrors] = useState<LineErrors[]>([]);

  useEffect(() => {
    // Função para fazer a requisição GET'
    const fetchData = async () => {
      try {
        const responseProducts = await fetch("http://localhost:3001/products");
        const responsePacks = await fetch("http://localhost:3001/packs");
        if (!responseProducts) {
          throw new Error("Não foi possível carregar os produtos.");
        }
        if (!responsePacks) {
          throw new Error("Não foi possível carregar os pacotes.");
        }
        const dataProducts: DbProduct[] = await responseProducts.json();
        const dataPacks: DbPack[] = await responsePacks.json();
        setDbProducts(dataProducts);
        setDbPacks(dataPacks);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    // Chamada da função de requisição ao carregar o componente
    fetchData();
  }, []);

  const value: AppContextType = {
    csvData,
    dbProducts,
    csvFields,
    tableError,
    dbPacks,
    tableIsEnabled,
    lineErrors,
    updateIsEnabled,
    setCsvData,
    setDbProducts,
    setCsvFields,
    setTableError,
    setDbPacks,
    setTableIsEnabled,
    setLineErrors,
    setUpdateIsEnabled
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
};