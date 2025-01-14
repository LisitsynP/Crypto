import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import CryptoContext from "../../context/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
import { useContext, useEffect, useState } from "react";

const headerStyle = {
  width: "100%",
  height: 60,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  padding: "1rem",
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const [coin, setCoin] = useState(null);
  const { crypto, drawer, changeDrawer } = useContext(CryptoContext);

  useEffect(() => {
    const keypress = (event) => {
      if (event.code === "Slash") {
        setSelect((prev) => !prev);
      }
    };

    document.addEventListener("keypress", keypress);

    return () => document.removeEventListener("keypress", keypress);
  }, []);

  function handleSelect(value) {
    setCoin(crypto.find((c) => c.id === value));
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        open={select}
        style={{
          width: "250px",
        }}
        value={"press / to open"}
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          emoji: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.emoji}
              alt={option.data.label}
            />{" "}
            {option.data.label}
          </Space>
        )}
      />

      <Button type="primary" onClick={() => changeDrawer(true)}>
        Add Asset
      </Button>

      <Modal open={modal} onCancel={() => setModal(false)} footer={null}>
        <CoinInfoModal coin={coin} />
      </Modal>

      <Drawer
        width={600}
        title="Add Asset"
        onClose={() => changeDrawer(false)}
        open={drawer}
        destroyOnClose
      >
        <AddAssetForm onClose={() => changeDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}
