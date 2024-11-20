import React, { useContext } from "react";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalizeString } from "../../utils";
import CryptoContext from "../../contexts/crypto-context";

const siderStyle = {
  padding: "1rem",
};

function AppSider() {
  const { loading, cryptoAssets } = useContext(CryptoContext);
  if (loading) return <Spin fullscreen />;
  return (
    <Layout.Sider width="25%" style={siderStyle}>
      {cryptoAssets.map((asset) => (
        <Card
          key={asset.id}
          style={{ marginBottom: "1rem" }}
        >
          <Statistic
            title={capitalizeString(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.value ? "#3f8600" : "#cf1322",
            }}
            prefix={
              asset.value ? <ArrowUpOutlined /> : <ArrowDownOutlined />
            }
            suffix="$"
          />
          <List
            dataSource={[
              {
                title: "Total profit",
                icon: asset.icon,
                value: asset.totalProfit,
                currency: "$",
                hasTag: true,
              },
              {
                title: "Asset amount",
                value: asset.totalAmount,
                currency: "",
                isPlain: true,
              },
              {
                title: "Difference",
                value: asset.valuePercent,
                currency: "%",
              }, // TODO
            ]}
            size="default"
            split="true"
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.hasTag && (
                    <Tag color={asset.value ? "green" : "red"}>
                      {asset.valuePercent}%
                    </Tag>
                  )}
                  {item.isPlain && item.value.toFixed(2)}
                  {!item.isPlain && (
                    <Typography.Text
                      type={asset.value > 0 ? "success" : "danger"}
                    >
                      {item.value.toFixed(2)}
                      {item.currency}
                    </Typography.Text>
                  )}
                </span>
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}

export default AppSider;
