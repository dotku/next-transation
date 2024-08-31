import { supabase } from "@/app/services/supabase";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import ErrorModal from "../modals/ErrorModal";
import SuccessModal from "../modals/SuccessModal";

export default function ContactList({ data = [] }) {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<any[] | null>(data);
  const [error, setError] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function genContacts() {
      const { data: contactsData, error } = await supabase
        .from("contacts")
        .select()
        .order("created_at", { ascending: false });

      if (error) {
        setError(error);
      }

      setContacts(contactsData);
      setTimeout(() => setLoading(false), 1000);
    }

    genContacts();
  }, []);

  const onOpenChange = () => {
    setError(null);
    setSuccessMessage("");
  };

  const handleDeleteContactClick = (id: string) => () => {
    async function genContactDelete() {
      const { error } = await supabase.from("contacts").delete().eq("id", id);

      if (error) {
        setError(error);
      }

      setContacts((contacts) =>
        Array.isArray(contacts) ? contacts.filter((d) => d.id !== id) : []
      );
      setSuccessMessage("contact delete successfully");
    }
    genContactDelete();
  };

  if (loading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  return (
    <div>
      {Array.isArray(contacts) && contacts.length ? (
        contacts.map((c) => (
          <Card key={c.id} className="m-3">
            <CardHeader className="text-xl">{c.name}</CardHeader>
            <Divider />
            <CardBody>
              <pre>{JSON.stringify(c, null, 2)}</pre>
            </CardBody>
            <Divider />
            <CardFooter className="justify-end">
              <Button
                color="danger"
                variant="bordered"
                onClick={handleDeleteContactClick(c.id)}
              >
                delete
              </Button>
            </CardFooter>
          </Card>
        ))
      ) : (
        <>Empty contacts</>
      )}
      {/* {successMessage && (
        <SuccessModal
          isOpen={successMessage}
          message={successMessage}
          onOpenChange={onOpenChange}
        />
      )} */}
      {error && <ErrorModal isOpen={error} onOpenChange={onOpenChange} />}
    </div>
  );
}
