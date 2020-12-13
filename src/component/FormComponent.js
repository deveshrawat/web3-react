import React, { useState, useEffect } from "react";
import { Form, Input, Button, InputNumber } from "antd";
import { UpCircleOutlined, TransactionOutlined } from "@ant-design/icons";
const reciever = "0x7Ca11D1AfF40D043415dEb05E2cC50Fb5dc4a4B7";

const FormComponent = ({ contract, accounts, transfer }) => {
  const [componentSize, setComponentSize] = useState("medium");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const onFinish = (values) => {
    console.log(values);
    transfer(values.address, values.amount);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Form
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 17,
        }}
        layout="verticel"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Eth Address"
          name="address"
          rules={[
            {
              required: true,
              message: "Please input reciever's ETH address!",
            },
          ]}
        >
          <Input
            type="text"
            required
            placeholder="0x0000000000000000000000000000000000000000"
          />
        </Form.Item>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[
            {
              required: true,
              message: "Please input amount you want to send!",
            },
          ]}
        >
          <Input type="number" required placeholder="0" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            shape="round"
            icon={<TransactionOutlined />}
            size={"middle"}
            // disabled={deploymentinProgress ? true : false}
          >
            Transfer Tokens
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default FormComponent;