import React, { useEffect, useState } from "react";
import { Layout, Select, Space, Button, Modal, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useCryptoContext } from "../../contexts/crypto-context";
import CoinInfoModal from "../CoinInfoModal";
import AddAssetForm from "../AddAssetForm";
const headerStyle = {
  width: "100%",
  textAlign: "center",
  height: "55px",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

function AppHeader({ onCloseHandler }) {
  const [select, setSelect] = useState(false);
  const [isCryptoModalOpen, setIsCryptoModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isDrawer, setIsDrawer] = useState(false);
  const { cryptoData } = useCryptoContext();

  function handleSelect(value) {
    setSelectedCoin(cryptoData.find((coin) => coin.id === value));
    setIsCryptoModalOpen(true);
  }

  useEffect(() => {
    const keyPress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keyPress);
    return () => document.removeEventListener("keypress", keyPress);
  }, []);
  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{
          width: "250px",
        }}
        value={"Press / to open!"}
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        options={cryptoData.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img src={option.data.icon} width={"20px"} /> {option.data.label}
          </Space>
        )}
      />
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsDrawer(true)}
      >
        Add asset
      </Button>

      <Modal
        open={isCryptoModalOpen}
        onCancel={() => setIsCryptoModalOpen(false)}
        footer={null}
      >
        <CoinInfoModal coin={selectedCoin} />
      </Modal>

      <Drawer
        width={600}
        title="Add asset"
        onClose={() => setIsDrawer(false)}
        open={isDrawer}
        destroyOnClose
      >
        <AddAssetForm onCloseHandler={() => setIsDrawer(false)} />
      </Drawer>
    </Layout.Header>
  );
}

export default AppHeader;
