import { useContext } from "react";
import { RowData } from "../interfaces/rowData";
import AppContext from "../context/AppContext";
import { LineErrors } from "../interfaces/lineErrors";

const TableRow: React.FC<{ data: RowData }> = ({ data }) => {
  const { lineErrors } = useContext(AppContext);
  const product = lineErrors.find((i: LineErrors) => i.code === data.code);
  return (
    <tr className="border-b-[0.1rem] border-green-900 dark:bg-[#37866f] bg-gradient-to-r from-[#185c48] m-10">
      <td className="whitespace-nowrap px-6 text-white font-medium text-center p-3">
        {data.code}
      </td>
      <td className="whitespace-nowrap px-6 text-white p-3 font-normal">{data.name}</td>
      <td className="whitespace-nowrap px-6 text-white text-center font-medium p-3">
        {data.salesPrice}
      </td>
      <td className="whitespace-nowrap px-6 text-white text-center font-medium p-3">
        {data.newPrice}
      </td>
          {lineErrors.length > 0 ? 
            <td>
              <ul>
              { product?.message?.map((message: string, index: number) => (<li className="whitespace-nowrap px-6 text-white font-bold" key={index}>{`${index + 1}. ${message}`}</li>))}
              </ul>
            </td>
          : null}
    </tr>
  );
};

export default TableRow;
