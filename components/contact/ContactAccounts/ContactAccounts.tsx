import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

export default function ContactAccounts() {
  return (
    <Card>
      <CardHeader>
        <div className="text-xl">Contact Accounts</div>
      </CardHeader>
      <CardBody>
        <ul className="mb-3">
          <li>
            {JSON.stringify({
              type: "bank",
              bank_name: "中国建设银行",
              account_number: "12345678901234",
            })}
          </li>
          <li>
            {JSON.stringify({
              type: "alipay",
              account_number: "12345678901234",
            })}
          </li>
          <li>
            {JSON.stringify({
              type: "wepay",
              account_number: "12345678901234",
            })}
          </li>
        </ul>
      </CardBody>
      <CardFooter className="justify-center">
        <Button>+ account</Button>
      </CardFooter>
    </Card>
  );
}
