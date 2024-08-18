"use client";

import { Button } from "@nextui-org/button";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Spinner,
  Input,
  RadioGroup,
  Radio,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Link,
} from "@nextui-org/react";

import BankAccountInputs from "../../components/send-money/BankAccountInputs";
import DebitCardInputs from "../../components/send-money/DebitCardInputs";
import AlipayInput from "../../components/send-money/AlipayInput";
import WePayInput from "../../components/send-money/WePayInput";

const TRANSFER_FEE = 3.99;
const usdConverRates = {
  CNY: 7.013,
};
const usdFormat = (num) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(num);

const cnyFormat = (num) =>
  Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(num);

export default function AcountPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [sendAmount, setSendAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("bank-account");
  const [receiveMethod, setReceiveMethod] = useState("bank-account");

  useEffect(() => {
    axios
      .get("/api/users")
      .then((rsp) => {
        console.log("users", rsp.data);
        setUsers(rsp.data);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner className="mx-auto" />
      </div>
    );

  return (
    <div className="grid grid-cols-8 gap-3">
      <div className="md:col-span-6 col-span-8">
        <Select className="mb-3" label="Select a eceiver">
          {users.length ? (
            users.map((u) => <SelectItem key={u.id}>{u.email}</SelectItem>)
          ) : (
            <SelectItem>loading...</SelectItem>
          )}
        </Select>
        <Input
          className="mb-3"
          label="Sending amount"
          pattern="[0-9]*"
          type="number"
          value={sendAmount}
          onChange={(e) => setSendAmount(e.target.value.replace(/^0+/, ""))}
        />

        <RadioGroup
          className="mb-3"
          label="How does your receiver want the money?"
          value={receiveMethod}
          onChange={(e) => setReceiveMethod(e.target.value)}
        >
          <Radio
            description="require route number and account number"
            value="bank-account"
          >
            Bank account
          </Radio>
          <Radio description="require account id" value="alipay">
            Alipay 支付宝
          </Radio>
          <Radio description="require account id" value="wepay">
            WePay 微信支付
          </Radio>
        </RadioGroup>

        {receiveMethod === "bank-account" && <BankAccountInputs />}
        {receiveMethod === "alipay" && <AlipayInput />}
        {receiveMethod === "wepay" && <WePayInput />}

        <RadioGroup
          className="mb-3"
          label="How would you like to pay?"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <Radio description="require account id" value="debit-card">
            Debit card
          </Radio>
          <Radio description="require account id" value="bank-account">
            Bank account
          </Radio>
          <Radio description="require account id" value="alipay">
            Alipay 支付宝
          </Radio>
          <Radio description="require account id" value="wepay">
            WePay 微信支付
          </Radio>
        </RadioGroup>
        {paymentMethod === "debit-card" && <DebitCardInputs />}
        {paymentMethod === "bank-account" && <BankAccountInputs />}
        {paymentMethod === "alipay" && <AlipayInput />}
        {paymentMethod === "wepay" && <WePayInput />}
      </div>
      <div className="md:col-span-2 col-span-8">
        <Card className="mb-3">
          <CardHeader>
            <h2 className="text-2xl">Summary</h2>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>
              <div className="text-left">Exchange rate:</div>
              <div className="text-right">
                1.00 USD = {usdConverRates.CNY} CNY
              </div>
            </div>
            <Divider className="my-3" />
            <div>
              <div className="flex justify-between">
                <span>Transfer amount:</span>{" "}
                <span>{usdFormat(sendAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer fee:</span>{" "}
                <span>{usdFormat(TRANSFER_FEE)}</span>
              </div>
              <div className="flex justify-between">
                <span>Transfer total:</span>
                <span>{usdFormat(sendAmount + TRANSFER_FEE)}</span>
              </div>
            </div>
            <Divider className="my-3" />
            <div className="flex justify-between">
              <span>Total to receive:</span>{" "}
              <span>{cnyFormat(sendAmount * usdConverRates.CNY)}</span>
            </div>
          </CardBody>
        </Card>
        <div className="text-center">
          <Button as={Link} color="primary" href="/send-money/confirm">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
