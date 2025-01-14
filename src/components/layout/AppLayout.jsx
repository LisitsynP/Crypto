import { Layout, Spin, Typography } from "antd";
import { useContext } from "react";
import AppHeader from "./AppHeader";
import EmptyPortfolio from "../EmptyPortfolio";
import AppSider from "./AppSider";
import AppContent from "./AppContent";
import CryptoContext from "../../context/crypto-context";

const titleStyle = {
  margin: "0px",
  padding: "100px 0px",
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#001529",
};

export default function AppLayout() {
  const { loading, assets, changeDrawer } = useContext(CryptoContext);

  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout>
      <AppHeader />
      <Layout>
        {!assets.length && (
          <Typography.Title style={titleStyle} level={2}>
            Your portfolio is empty
          </Typography.Title>
        )}
        {!assets.length && <EmptyPortfolio changeDrawer={changeDrawer} />}

        {!!assets.length && <AppSider />}
        {!!assets.length && <AppContent />}
      </Layout>
    </Layout>
  );
}
