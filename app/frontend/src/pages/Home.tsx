import React, { useContext } from "react";
import ValidateButton from "../components/ValidateButton";
import CsvUpload from "../components/CsvUpload";
import Table from "../components/Table";
import AppContext from "../context/AppContext";
import { CsvProduct } from "../interfaces/csvProduct";
import { DbProduct } from "../interfaces/dbProduct";
import { RowData } from "../interfaces/rowData";
import UpdateButton from "../components/UpdateButton";
import { formatPrice } from "../utils";

function Home() {
  const {
    csvData,
    dbProducts,
  }: { csvData: CsvProduct[]; dbProducts: DbProduct[] } =
    useContext(AppContext);
  const rows = csvData.map((product) => {
    const dbProduct = dbProducts.find(
      (i) => i.code === product.code
    ) as DbProduct;
    const row: RowData = {
      code: product.code,
      name: dbProduct?.name ? dbProduct.name : "CÓDIGO INVÁLIDO",
      newPrice: formatPrice(String(product.newPrice)),
      salesPrice: dbProduct?.salesPrice
        ? formatPrice(dbProduct.salesPrice)
        : "-",
    };
    return row;
  });

  return (
    <>
      <Table rows={rows} />
      <CsvUpload />
      <ValidateButton />
      <UpdateButton />
    </>
  );
}

export default Home;
