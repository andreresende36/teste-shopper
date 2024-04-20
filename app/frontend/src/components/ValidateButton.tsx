import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import { LineErrors } from "../interfaces/lineErrors";
import {
  validateCodes,
  validateExistsOnDb,
  validateFields,
  validateFinancePrices,
  validateMarketingPrices,
  validatePacksPrices,
  validatePacksProducts,
  validateTypePrices,
} from "../utils";

function ValidateButton() {
  const { csvData, csvFields, dbProducts, tableError, setTableError, dbPacks } =
    useContext(AppContext);
  const [lineErrors, setLineErrors] = useState<LineErrors[]>([]);

  const handleValidation = async () => {
    const missingFields = validateFields(csvFields);
    if (missingFields.length > 0) {
      setTableError(`Campos necessários ausentes: ${missingFields.join(", ")}`);
      return;
    }

    let errors = validateCodes(csvData);
    errors = validateTypePrices(csvData, errors);
    errors = validateFinancePrices(csvData, dbProducts, errors);
    errors = validateMarketingPrices(csvData, dbProducts, errors);
    errors = validatePacksProducts(csvData, dbPacks, errors);
    errors = validatePacksPrices(csvData, dbPacks, errors);
    errors = validateExistsOnDb(csvData, dbProducts, errors);

    setLineErrors(errors);
  };

  return (
    <div>
      <button disabled={!(tableError === "")} onClick={handleValidation}>
        VALIDAR
      </button>
      {(tableError || lineErrors.length > 0) && <p>{tableError}</p>}
    </div>
  );
}

export default ValidateButton;
