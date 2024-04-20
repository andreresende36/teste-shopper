import React, { useContext } from "react";
import ValidateButton from "../components/ValidateButton";
import CsvUpload from "../components/CsvUpload";
import Table from "../components/Table";
import AppContext from "../context/AppContext";
import { CsvProduct } from "../interfaces/csvProduct";
import { DbProduct } from "../interfaces/dbProduct";

function Home() {
  const { csvData , dbProducts }: { csvData: CsvProduct[], dbProducts: DbProduct[]} = useContext(AppContext);
  const rows = csvData.map((product) => {
    const dbProduct = dbProducts.filter((i) => i )
  })

  return (
    <>
      <CsvUpload />
      <ValidateButton />
      <Table rows={[]} />
    </>
  );
}

export default Home;
