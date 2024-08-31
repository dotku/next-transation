"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Checkbox } from "@nextui-org/checkbox";
import { FormEvent, useCallback, useState } from "react";

import { supabase } from "@/app/services/supabase";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import ContactList from "@/components/contact/ContactList";
import ContactAccounts from "@/components/contact/ContactAccounts";

interface TransationData {
  name: string;
  email?: string;
  phone?: string;
}

const initialData: TransationData = {
  name: "",
  email: "",
  phone: "",
};

export default function ContactPage() {
  const [data, setData] = useState<TransationData>(initialData);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const handleDataChange =
    (field: string) => (e: FormEvent<HTMLInputElement>) => {
      setData({
        ...data,
        [field]: e.currentTarget.value,
      });
    };

  const onOpenChange = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("(handleSubmit) data", data);
    setMessage("");
    const { data: supabaseData, error } = await supabase
      .from("contacts")
      .insert([data])
      .single();

    if (error) {
      console.error(error);
      alert("add contact failed");
      return;
    }
    setMessage("contact update successfully.");
    setIsOpen(true);
    setData(initialData);

    console.log("data", supabaseData);
  };

  const PageContactList = useCallback(() => <ContactList />, [message]);

  return (
    <>
      <header className="mb-3">
        <h3 className="text-3xl">Contacts</h3>
        <p>add your contact for quick transer fund in the future.</p>
      </header>
      <form onSubmit={handleSubmit}>
        <Input
          isRequired
          required
          className="mb-3"
          label="contact's name"
          placeholder="your name"
          value={data["name"]}
          onChange={handleDataChange("name")}
        />
        <Input
          className="mb-3"
          label="contacts's email"
          placeholder="contacts's email"
          type="contact's email"
          value={data["email"]}
          onChange={handleDataChange("email")}
        />
        <Input
          className="mb-3"
          label="phone"
          placeholder="contact's phone"
          value={data["phone"]}
          onChange={handleDataChange("phone")}
        />
        <div className="mb-3">
          <ContactAccounts />
        </div>
        <Button className="mb-3" type="submit">
          Submit
        </Button>
      </form>
      <PageContactList />
      {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Success</ModalHeader>
              <ModalBody>
                <p>Create contact successfully :&#x29; </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Okay
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal> */}
    </>
  );
}
