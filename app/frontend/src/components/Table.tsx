import TableRow from "./TableRow";
import { RowData } from "../interfaces/rowData";
import { useContext } from "react";
import AppContext from "../context/AppContext";

const Table: React.FC<{ rows: RowData[] }> = ({ rows }) => {
  const { tableIsEnabled, lineErrors } = useContext(AppContext);
  const table = (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Nome</th>
          <th>Preço Atual</th>
          <th>Novo Preço</th>
          {lineErrors.length > 0 ? <th>Erros</th> : null}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <TableRow key={index} data={row} />
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {tableIsEnabled ? table : null}
    </>
  );
};

export default Table;
