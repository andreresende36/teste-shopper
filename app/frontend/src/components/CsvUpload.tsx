import React, { useContext, useRef,useEffect } from "react";
import { CsvProduct } from "../interfaces/csvProduct";
import AppContext from "../context/AppContext";

const CsvUpload: React.FC = () => {
  const {
    setCsvData,
    setCsvFields,
    setTableError,
    setValidateIsEnabled,
    setTableIsEnabled,
    setUpdateIsEnabled,
    setUpdateSuccess,
    updateSuccess
  } = useContext(AppContext);

  // Create a ref to store the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTableIsEnabled(false);
    setUpdateIsEnabled(false);
    setUpdateSuccess(false);
    setTableError('');
    const file = event.target.files?.[0];
    if (file) {
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (extension !== "csv") {
        setTableError("Erro: O arquivo carregado não é um arquivo .csv");
        return;
      } else {
        setTableError("");
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

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear the file selection
    }
  };

  useEffect(() => {
    if (updateSuccess) {
      clearFileInput();
    }
  }, [updateSuccess]);

  return (
    <div className="relative mt-3 flex justify-center items-center">
      <label
        htmlFor="formFile"
        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
      >
        <input
          id="formFile"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef} // Assign the ref to the input element
          className="bg-slate-100 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-green-800 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-black dark:file:bg-green-700 dark:file:text-white dark:file:font-semibold dark:focus:border-primary"
        />
      </label>
    </div>
  );
}

export default CsvUpload;
