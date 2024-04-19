import React, { useState, useContext } from 'react'
import AppContext from '../context/AppContext';
import validateFields from '../utils/validateFields';
import validateCodes from '../utils/validateCodes';
import validatePrices from '../utils/validatePrices';

function ValidateButton() {
  const { csvData, csvFields } = useContext(AppContext);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const handleValidation = () => {
    const missingFields = validateFields(csvFields);
    if (missingFields.length > 0) {
      setErrorMessage(
        `Campos necessários ausentes: ${missingFields.join(", ")}`
      );
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
    setErrorMessage(
      "Arquivo de atualização de preços validado com sucesso! Clique em ATUALIZAR"
    );
  };
  return (
    <div>
      <button onClick={handleValidation}>Validar</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default ValidateButton
