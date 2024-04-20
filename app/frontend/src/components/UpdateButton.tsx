import { useContext } from "react"
import AppContext from "../context/AppContext"

function UpdateButton() {
  const { updateIsEnabled } = useContext(AppContext)
  return (
    <>
      <button disabled={ !updateIsEnabled } >ATUALIZAR</button>
    </>
  )
}

export default UpdateButton