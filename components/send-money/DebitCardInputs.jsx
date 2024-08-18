import { Input } from "@nextui-org/input";

export default function DebitCardInputs() {
  return (
    <>
      <h3 className="text-medium mb-1">Debit Card Information</h3>
      <Input className="block mb-3" label="card number" />
      <Input className="block mb-3" label="exp" />
      <Input className="block mb-3" label="CVV" />
    </>
  );
}
