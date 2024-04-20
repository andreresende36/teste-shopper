import { RowData } from "../interfaces/rowData";

const TableRow: React.FC<{ data: RowData }> = ({ data }) => (
  <tr>
    <td>{data.code}</td>
    <td>{data.name}</td>
    <td>{data.salesPrice}</td>
    <td>{data.newPrice}</td>
  </tr>
);

export default TableRow