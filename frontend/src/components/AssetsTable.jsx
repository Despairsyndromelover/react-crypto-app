import React from "react";
import { Table } from "antd";
import { useCryptoContext } from "../contexts/crypto-context";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    showSorterTooltip: {
      target: "full-header",
    },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];

function AssetsTable() {
  const { cryptoAssets } = useCryptoContext();
  const data = cryptoAssets.map((a) => ({
    key: a.id,
    name: a.name,
    price: a.price,
    amount: a.totalAmount.toFixed(2),
  }));
  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={data}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
}

export default AssetsTable;
