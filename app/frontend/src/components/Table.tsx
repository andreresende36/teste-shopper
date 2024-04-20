import TableRow from "./TableRow";
import { RowData } from "../interfaces/rowData";

const Table: React.FC<{ rows: RowData[] }> = ({ rows }) => (
  <table>
    <thead>
      <tr>
        <th>Código</th>
        <th>Nome</th>
        <th>Preço Atual</th>
        <th>Novo Preço</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <TableRow key={index} data={row} />
      ))}
    </tbody>
  </table>
);

export default Table;