import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(_request) {
  const users = await prisma.users.findMany();
  return NextResponse.json(users);
}
