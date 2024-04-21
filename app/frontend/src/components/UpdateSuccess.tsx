import { useContext } from "react";
import AppContext from "../context/AppContext";

function UpdateSuccess() {
  const { updateSuccess } = useContext(AppContext);
  return (
  <div className="text-xl font-semibold text-neutral-800 mb-3">
    { updateSuccess ? <div>Preços atualizados com sucesso!</div> : null}
  </div>
    
  )
}

export default UpdateSuccess