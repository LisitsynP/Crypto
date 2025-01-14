import { useState, useContext, useRef } from "react";
import {
  Select,
  Space,
  Divider,
  Form,
  InputNumber,
  Button,
  DatePicker,
  Result,
} from "antd";
import CryptoContext from "../context/crypto-context";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${lable} is required!",
  types: {
    number: "${lable} is not valid number",
  },
  number: {
    range: "${lable} must be between ${min} and ${max}",
  },
};

export default function AddAssetForm({ onClose }) {
  const { crypto, addAsset } = useContext(CryptoContext);
  const [coin, setCoin] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const assetRef = useRef();
  const [form] = Form.useForm();

  if (submitted) {
    return (
      <Result
        status="success"
        title="New Asset Added!"
        subTitle={`Added ${assetRef.current.amount} of ${coin.name} by price ${assetRef.current.price}`}
        extra={[
          <Button type="primary" key="console" onClick={onClose}>
            Close
          </Button>,
        ]}
      />
    );
  }

  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => setCoin(crypto.find((c) => c.id === v))}
        placeholder={"Select coin"}
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
    );
  }
  function onFinish(value) {
    const newAsset = {
      id: coin.id,
      amount: value.amount,
      price: value.price,
      date: value.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    addAsset(newAsset, coin);
    setSubmitted(true);
  }

  function handleAmountChenge(value) {
    const price = form.getFieldValue("price");

    form.setFieldsValue({
      total: +(value * price).toFixed(2),
    });
  }
  function handlePriceChenge(value) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * value).toFixed(2),
    });
  }

  return (
    <Form
      form={form}
      name="basic"
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
      <CoinInfo coin={coin} />
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
          placeholder="enter coin amount"
          onChange={handleAmountChenge}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Price" name="price">
        <InputNumber onChange={handlePriceChenge} style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item label="Date & Time" name="data & time">
        <DatePicker showTime />
      </Form.Item>

      <Form.Item label="Total" name="total">
        <InputNumber disabled style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
