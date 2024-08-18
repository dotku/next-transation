import { Input } from "@nextui-org/input";

export default function BankAccountInputs() {
  return (
    <>
      <h3 className="text-medium mb-1">Bank Account Information</h3>
      <Input className="block mb-3" label="routing number" />
      <Input className="block mb-3" label="account number" />
    </>
  );
}
