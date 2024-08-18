"use client";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon } from "@nextui-org/shared-icons";

export default function SendMoneyConfirmPage() {
  const router = useRouter();

  return (
    <div>
      <h2 className="text-2xl">Confirm</h2>
      <p className="bg-yellow-500 p-6 text-white my-3 text-xl text-center rounded-lg">
        this page is under construction!!!{" "}
      </p>
      <div className="text-center">
        <Button
          color="primary"
          endContent={<ArrowLeftIcon />}
          onClick={() => router.back()}
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
