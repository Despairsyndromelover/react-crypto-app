import React from "react";
import { Divider, Flex, Tag, Typography } from "antd";
import CoinInfo from "./CoinInfo";
function CoinInfoModal({ coin }) {
  return (
    <>
      <CoinInfo coin={coin} hasSymbol={true}/>
      <Divider />
      <Typography.Paragraph>
        <Typography.Text strong>1 hour: </Typography.Text>
        <Tag color={coin.priceChange1h > 0 ? "success" : "error"}>
          {coin.priceChange1h}%
        </Tag>
        <Typography.Text strong>1 day: </Typography.Text>
        <Tag color={coin.priceChange1d > 0 ? "success" : "error"}>
          {coin.priceChange1d}%
        </Tag>
        <Typography.Text strong>1 week: </Typography.Text>
        <Tag color={coin.priceChange1w > 0 ? "success" : "error"}>
          {coin.priceChange1w}%
        </Tag>
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price: </Typography.Text>
        {coin.price.toFixed(2)}$
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Price in BTC: </Typography.Text>
        {coin.priceBtc} BTC
      </Typography.Paragraph>
      <Typography.Paragraph>
        <Typography.Text strong>Market capitalization: </Typography.Text>
        {coin.marketCap.toFixed(2)}$
      </Typography.Paragraph>
      {coin.contractAddress && (
        <Typography.Paragraph>
          <Typography.Text strong>Contract address: </Typography.Text>
          {coin.contractAddress}
        </Typography.Paragraph>
      )}
    </  >
  );
}

export default CoinInfoModal;