import { Table } from "antd";
import CryptoContext from "../context/crypto-context";
import { useContext } from "react";

const columns = [
  {
    title: "Name:",
    dataIndex: "name",
    showSorterTooltip: {
      target: "full-header",
    },
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Amount tokens:",
    dataIndex: "amount",
  },
  {
    title: "Total amount, $",
    dataIndex: "totalAmount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
];

export default function AssetsTable() {
  const { assets } = useContext(CryptoContext);

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    totalAmount: asset.totalAmount.toFixed(2),
    amount: asset.amount,
  }));

  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
}
