import React, { useState } from "react";
import validateFields from "../utils/validateFields";
import validateCodes from "../utils/validateCodes";
import { Product } from "../interfaces/product";
import validatePrices from "../utils/validatePrices";

const CsvUploadComponent: React.FC = () => {
  const [csvData, setCsvData] = useState<Product[]>([]);
  const [fields, setFields] = useState<String[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target?.result as string;
        parseCsv(contents);
      };
      reader.readAsText(file);
    }
  };

  const parseCsv = (csv: string) => {
    const lines = csv.split("\n");
    setFields(lines[0].replace("\r", "").split(","));
    const products: Product[] = [];
  
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        let [code, newPrice] = line.split(",");
        products.push({
          code: code as any,
          newPrice: newPrice as any,
        });
      }
    }
    products.forEach(({code, newPrice}, i) => {
      if (!isNaN(Number(code))){
        products[i].code = Number(code);
      }
      if(!isNaN(Number(newPrice))){
        products[i].newPrice = Number(newPrice);
      }
    })
    setCsvData(products);
  };

  const handleValidation = () => {
    const missingFields = validateFields(fields);
    if (missingFields.length > 0) {
      setErrorMessage(`Campos necessários ausentes: ${missingFields.join(", ")}`);
      return;
    }

    const invalidCodes = validateCodes(csvData);
    if (invalidCodes.length > 0) {
      setErrorMessage(
        `Códigos de produtos inválidos ou repetidos: ${invalidCodes.join(", ")}`
      );
      return;
    }

    const invalidPrices = validatePrices(csvData);
    if (invalidPrices.length > 0) {
      setErrorMessage(
        `Preços inválidos para os seguintes códigos de produtos: ${invalidPrices.join(
          ", "
        )}`
      );
      return;
    }

    // Se todas as validações passarem, limpar a mensagem de erro
    setErrorMessage('Arquivo de atualização de preços validado com sucesso! Clique em ATUALIZAR');
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button onClick={handleValidation}>Validar</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default CsvUploadComponent;
