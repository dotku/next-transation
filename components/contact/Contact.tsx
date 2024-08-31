"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { FormEvent, useState } from "react";

import { supabase } from "@/app/services/supabase";

interface TransationData {
  fund: number;
  note?: string;
  sender_name: string;
  sender_email?: string;
  sender_phone?: string;
  receiver_name: string;
  receiver_email?: string;
  receiver_phone?: string;
  referral?: string;
}

const initialData: TransationData = {
  fund: 0,
  note: "",
  sender_name: "",
  sender_email: "",
  sender_phone: "",
  receiver_name: "",
  receiver_email: "",
  receiver_phone: "",
  referral: "",
};

export default function TransationAgent() {
  const [data, setData] = useState<TransationData>(initialData);

  const handleDataChange =
    (field: string) => (e: FormEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [field]: e.currentTarget.value,
      });
    };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("(handleSubmit) data", data);
    const { data: supabaseData, error } = await supabase
      .from("transation")
      .insert([data])
      .select();

    if (error) {
      console.error(error);
      return;
    }

    setData(initialData);

    console.log("data", supabaseData);
  };

  return (
    <>
      <header className="mb-3">
        <h3 className="text-3xl">transation request</h3>
        <p>
          our service current support south asian countries to China transation
        </p>
      </header>
      <form onSubmit={handleSubmit}>
        <Input
          isRequired
          className="mb-3"
          label="fund"
          placeholder="how much you want to send?"
          value={data["fund"].toString()}
          onChange={handleDataChange("fund")}
        />
        <Input
          className="mb-3"
          label="note"
          placeholder="tell me what exactly you want to purchase"
          value={data["note"]}
          onChange={handleDataChange("note")}
        />
        <Input
          isRequired
          className="mb-3"
          label="name"
          placeholder="your name"
          value={data["sender_name"]}
          onChange={handleDataChange("sender_name")}
        />
        <Input
          className="mb-3"
          label="email"
          placeholder="your email"
          type="email"
          value={data["sender_email"]}
          onChange={handleDataChange("sender_email")}
        />
        <Input
          className="mb-3"
          label="phone"
          placeholder="your phone number"
          value={data["sender_phone"]}
          onChange={handleDataChange("sender_phone")}
        />
        <Input
          isRequired
          className="mb-3"
          label="reciver's name"
          placeholder="your name"
          value={data["receiver_name"]}
          onChange={handleDataChange("receiver_name")}
        />
        <Input
          className="mb-3"
          label="reciver's  email"
          placeholder="your email"
          type="reciver's email"
          value={data["receiver_email"]}
          onChange={handleDataChange("receiver_email")}
        />
        <Input
          className="mb-3"
          label="phone"
          placeholder="your phone number"
          value={data["receiver_phone"]}
          onChange={handleDataChange("receiver_phone")}
        />
        <Input
          className="mb-3"
          description="both of you would get $5 discount"
          label="referral"
          placeholder="who refere you to our service?"
          value={data["referral"]}
          onChange={handleDataChange("referral")}
        />
        <Button className="mb-3" type="submit">
          Submit
        </Button>
      </form>
      <div className="text-small text-left">
        <div className="mb-3">
          <h5 className="text-xl">SOP</h5>
          <ol className="list-decimal px-6">
            <li>Sender request trnsation</li>
            <li>Bank process the transation</li>
            <li>Bank update transation status once it is done</li>
            <li>
              Sender receive notification on the update (might need update
              document if anything failed)
            </li>
          </ol>
        </div>
      </div>
    </>
  );
}
