import { useContext } from "react";
import { RowData } from "../interfaces/rowData";
import AppContext from "../context/AppContext";
import { LineErrors } from "../interfaces/lineErrors";

const TableRow: React.FC<{ data: RowData }> = ({ data }) => {
  const { lineErrors } = useContext(AppContext);
  const product = lineErrors.find((i: LineErrors) => i.code === data.code);
  return (
    <tr>
      <td>{data.code}</td>
      <td>{data.name}</td>
      <td>{data.salesPrice}</td>
      <td>{data.newPrice}</td>
      <td>
        <ul>
          {product?.message?.map((message: string, index: number) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default TableRow;
