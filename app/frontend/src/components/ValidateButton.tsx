import React, { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import validateFields from "../utils/validateFields";
import validateCodes from "../utils/validateCodes";
import validateTypePrices from "../utils/validateTypePrices";
import { LineErrors } from "../interfaces/lineErrors";
import validateFinancePrices from "../utils/validateFinancePrices";
import validateMarketingPrices from "../utils/validateMarketingPrices";
import validateExistsOnDb from "../utils/validateExistsOnDb";
import validatePacks from "../utils/validatePacks";

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

    const errors1 = validateCodes(csvData);
    const errors2 = validateTypePrices(csvData, errors1);
    const errors3 = validateFinancePrices(csvData, dbProducts, errors2);
    const errors4 = validateMarketingPrices(csvData, dbProducts, errors3);
    const errors5 = validatePacks(csvData, dbPacks, errors4);
    const errors6 = validateExistsOnDb(csvData, dbProducts, errors5);
    setLineErrors(errors6);
  };
  return (
    <div>
      <button disabled={!(tableError === '')} onClick={handleValidation}>Validar</button>
      {(tableError || lineErrors) && <p>{tableError}</p>}
    </div>
  );
}

export default ValidateButton;
