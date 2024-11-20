import React, { useRef, useState } from "react";
import {
  Select,
  Space,
  Typography,
  Flex,
  Divider,
  Form,
  Button,
  InputNumber,
  DatePicker,
  Result,
} from "antd";
import { useCryptoContext } from "../contexts/crypto-context";
import { PlusOutlined } from "@ant-design/icons";
import CoinInfo from "./CoinInfo";

function AddAssetForm({ onCloseHandler }) {
  const [form] = Form.useForm();
  const { cryptoData, addAsset } = useCryptoContext();
  const [coin, setCoin] = useState(null);
  const [formSubmit, setFormSubmit] = useState(false);
  const assetRef = useRef();

  if (formSubmit) {
    return (
      <Result
        status="success"
        title="New asset added!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onCloseHandler}>
            Go back
          </Button>,
        ]}
      />
    );
  }

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}!",
    },
  };
  function onFinish(values) {
    console.log(values);
    const newAsset = {
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setFormSubmit(true);
    addAsset(newAsset)
  }

  function handleAmountChange(value) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }

  function handlePriceChange(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }
  if (!coin) {
    return (
      <Select
        style={{
          width: "100%",
        }}
        placeholder={"Select coin!"}
        onSelect={(coinValue) =>
          setCoin(cryptoData.find((coin) => coin.id === coinValue))
        }
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
    );
  }
  return (
    <Form
      form={form}
      name="Form "
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
      validateMessages={validateMessages}
    >
      <CoinInfo coin={coin} hasSymbol={false} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChange} style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item label="Date and time" name="date">
        <DatePicker showTime />
      </Form.Item>
      <Form.Item
        label="Total"
        name="total"
        rules={[
          {
            required: true,
            type: "number",
            min: 0,
          },
        ]}
      >
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Add asset
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddAssetForm;
