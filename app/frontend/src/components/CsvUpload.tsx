import React, { useContext } from "react";
import { CsvProduct } from "../interfaces/csvProduct";
import AppContext from "../context/AppContext";

const CsvUpload: React.FC = () => {
  const { setCsvData,  setCsvFields, setTableError, setValidateIsEnabled } = useContext(AppContext);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "csv") {
        setTableError("O arquivo carregado não é um arquivo CSV.");
        return;
      } else {
        setTableError('');
        setValidateIsEnabled(true);
      }
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
    setCsvFields(lines[0].replace("\r", "").split(","));
    const products: CsvProduct[] = [];

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
    products.forEach(({ code, newPrice }, i) => {
      if (!isNaN(Number(code))) {
        products[i].code = Number(code);
      }
      if (!isNaN(Number(newPrice))) {
        products[i].newPrice = Number(newPrice);
      }
    });
    setCsvData(products);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default CsvUpload;
