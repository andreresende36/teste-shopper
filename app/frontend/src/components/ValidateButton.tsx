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
    setUpdateIsEnabled
  } = useContext(AppContext);

  const handleValidation = async () => {
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
    errors = validatePacksPrices(csvData, dbPacks, errors);

    setLineErrors(errors);
    if (errors.length === 0) setUpdateIsEnabled(true)
    setTableIsEnabled(true);
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
