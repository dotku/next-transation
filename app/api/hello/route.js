import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_request) {
  const users = await prisma.users.findMany();
  const headersList = headers();
  const referer = headersList.get("referer");

  console.log(users);

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { referer: referer },
  });
}
