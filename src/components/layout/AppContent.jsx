import { Layout, Typography } from "antd";
import CryptoContext from "../../context/crypto-context";
import AssetsTable from "../AssetsTable";
import PortfolioChart from "../PortfolioChart";
import { useContext } from "react";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppContent() {
  const { assets, crypto } = useContext(CryptoContext);
  const cryptoPriceMap = crypto.reduce((acc, v) => {
    acc[v.id] = v.price;
    return acc;
  }, {});

  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title style={{ textAlign: "left", color: "#fff" }} level={3}>
        Portfolio:{" "}
        {assets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, v) => (acc += v), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
