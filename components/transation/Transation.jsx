"use client";

import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import { useState } from "react";
import cx from "classnames";

const defaultTransations = [
  {
    id: "001",
    status: "pending",
    type: "send",
    note: "pay to the vendor",
    amount: 10000,
  },
  {
    id: "002",
    status: "processed",
    type: "receive",
    note: "thank you!",
    amount: 50,
  },
];

export default function Transation() {
  const [transations, setTransations] = useState(defaultTransations);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState(0);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setTransations((transations) => [
      ...transations,
      {
        id: new Date().getTime(),
        amount,
        note,
        status: "pending",
      },
    ]);
    setNote("");
    setAmount(0);
  };

  console.log(transations);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <Input
          isRequired
          className="mb-2"
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Input
          className="mb-2"
          label="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button type="submit" color="primary">
          Send
        </Button>
      </form>
      {transations.map((t) => (
        <Card key={t.id} className="my-3">
          <CardHeader className="flex justify-between">
            {Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(t.amount)}
            <span
              className={cx({
                "text-warning": t.status === "pending",
                "text-success": t.status === "processed",
              })}
            >
              {t.status}
            </span>
          </CardHeader>
          <Divider />
          <CardBody>{t.note}</CardBody>
          {t.status === "pending" ? (
            <>
              <Divider />
              <CardFooter className="justify-end">
                <Button>Cancel</Button>
              </CardFooter>
            </>
          ) : null}
        </Card>
      ))}
    </>
  );
}
