import { Table, Button } from "antd";
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
    showSorterTooltip: {
      target: "full-header",
    },
    defaultSortOrder: "descend",
    sorter: (a, b) => a.totalAmount - b.totalAmount,
  },
  {
    title: "Action:",
    dataIndex: "action",
    align: "center",
    width: "15%",
  },
];

export default function AssetsTable() {
  const { assets, deleteAsset } = useContext(CryptoContext);

  const data = assets.map((asset) => ({
    key: asset.id,
    name: asset.name,
    totalAmount: asset.totalAmount.toFixed(2),
    amount: asset.amount,
    action: (
      <Button color="danger" variant="filled" size="small">
        Delete coin
      </Button>
    ),
  }));

  return (
    <Table
      onRow={(record) => {
        return {
          onClick: (event) => {
            if (null !== event.target.closest("button")) {
              deleteAsset(record);
            }
          },
        };
      }}
      pagination={false}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
}
