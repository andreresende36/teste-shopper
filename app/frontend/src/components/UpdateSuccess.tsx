import { useContext } from "react";
import AppContext from "../context/AppContext";

function UpdateSuccess() {
  const { updateSuccess } = useContext(AppContext);
  return (
  <>
    { updateSuccess ? <div>Preços atualizados com sucesso!</div> : null}
  </>
    
  )
}

export default UpdateSuccess