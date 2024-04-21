import { useContext } from "react";
import AppContext from "../context/AppContext";
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
  const {
    csvData,
    csvFields,
    dbProducts,
    tableError,
    setTableError,
    dbPacks,
    setTableIsEnabled,
    lineErrors,
    setLineErrors,
    setUpdateIsEnabled,
    validateIsEnabled,
    setUpdateSuccess
  } = useContext(AppContext);

  const handleValidation = async () => {
    setUpdateSuccess(false)
    const missingFields = validateFields(csvFields);
    if (missingFields.length > 0) {
      setTableError(`Campos necessários ausentes: ${missingFields.join(", ")}`);
      return;
    }

    let errors = validateCodes(csvData);
    errors = validateExistsOnDb(csvData, dbProducts, errors);
    errors = validateTypePrices(csvData, errors);
    errors = validateFinancePrices(csvData, dbProducts, errors);
    errors = validateMarketingPrices(csvData, dbProducts, errors);
    errors = validatePacksProducts(csvData, dbPacks, errors);
    errors = validatePacksPrices(csvData, dbPacks, dbProducts, errors);

    setLineErrors(errors);
    if (errors.length === 0) setUpdateIsEnabled(true);
    setTableIsEnabled(true);
  };

  return (
    <div>
      <button
        disabled={!validateIsEnabled}
        onClick={handleValidation}
        type="button"
        className={`font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none ${
          validateIsEnabled
            ? "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            : "text-gray-500 bg-gray-300 cursor-not-allowed"
        }`}
      >
        VALIDAR
      </button>
      {(tableError || lineErrors.length > 0) && <p>{tableError}</p>}
    </div>
  );
}

export default ValidateButton;
