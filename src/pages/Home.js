import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import Layout from "../component/Layout";
import FormComponent from "../component/FormComponent";
import UserInfo from "../component/UserInfo";
import TableComponent from "../component/TableComponent";

const Home = ({ web3, accounts, contract }) => {
  const [txHash, setTxHash] = useState(null);
  const [amount, setAmount] = useState(null);
  const [status, setStatus] = useState("");
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    contract.methods
      .balanceOf(accounts[0])
      .call()
      .then((res) => setBalance(res));
  }, [contract, accounts, status]);

  const transfer = async (address, amount) => {
    setAmount(amount);
    setAddress(address);
    let currHash;
    await contract.methods
      .transfer(address, amount)
      .send({ from: accounts[0], ges: "20" })
      .on("transactionHash", (hash) => {
        currHash = hash;
        setTxHash(hash);
        setStatus("PENDING");
      });
    let receipt = await web3.eth.getTransactionReceipt(currHash);
    console.log(receipt);
    if (receipt.status === true || receipt.status === 1) {
      setBalance(balance - amount);
      setStatus("SUCCESSFUL");
      return;
    } else if (receipt.status === false || receipt.status === 0) {
      setStatus("FAILED");
      return;
    }
  };

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <UserInfo balance={balance} accounts={accounts} />
          <FormComponent transfer={transfer} status={status} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TableComponent
            txHash={txHash}
            amount={amount}
            status={status}
            address={address}
          />
        </Col>
      </Row>
    </Layout>
  );
};

export default Home;
