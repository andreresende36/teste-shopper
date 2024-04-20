import { useContext } from "react";
import AppContext from "../context/AppContext";

function UpdateButton() {
  const { updateIsEnabled } = useContext(AppContext);
  const handleButton = async () => {
    const response = await fetch("http://localhost:3001/products", {
      method: "PUT",
    });
    const data = await response.json()
    console.log(data);
    
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
