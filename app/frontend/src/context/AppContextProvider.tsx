import React, { useState, useEffect } from 'react';
import { Product } from '../interfaces/product';
import { AppContextType } from '../interfaces/AppContextType';
import AppContext from './AppContext';
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [csvData, setCsvData] = useState<Product[]>([]);
  const [dbProducts, setProducts] = useState<Product[]>([]);
  const [csvFields, setCsvFields] = useState<string[]>([]);

  useEffect(() => {
    // Função para fazer a requisição GET'
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response) {
          throw new Error("Não foi possível carregar os produtos.");
        }
        const data = await response.json();
        setProducts(data);
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
    setCsvData,
    setProducts,
    setCsvFields,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
};