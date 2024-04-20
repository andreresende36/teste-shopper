import { useContext } from "react";
import AppContext from "../context/AppContext";

function UpdateButton() {
  const { updateIsEnabled, csvData, setUpdateSuccess } = useContext(AppContext);
  const handleButton = async () => {   
    const response = await fetch("http://localhost:3001/products", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(csvData)
    });
    const data = await response.json();
    if (data.message === 'OK') setUpdateSuccess(true);    
  };
  return (
    <>
      <button disabled={!updateIsEnabled} onClick={handleButton}>
        ATUALIZAR
      </button>
    </>
  );
}

export default UpdateButton;
