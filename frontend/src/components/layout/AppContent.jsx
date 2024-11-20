import React from "react";
import { Layout, Typography } from "antd";
import { useCryptoContext } from "../../contexts/crypto-context";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "../AssetsTable";

const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 55px)",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};
function AppContent() {
  const { cryptoAssets, cryptoData } = useCryptoContext();

  const cryptoPriceMap = cryptoData.reduce((acc, c) => {
    acc[c.id] = c.price;
    return acc;
  }, {});
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title level={3} style={{ textAlign: "left", color: "#fff" }}>
        Portfolio:{" "}
        {cryptoAssets
          .map((asset) => asset.amount * cryptoPriceMap[asset.id])
          .reduce((acc, val) => (acc += val), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}

export default AppContent;
