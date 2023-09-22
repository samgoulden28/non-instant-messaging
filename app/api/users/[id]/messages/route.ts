import { NextRequest } from "next/server";
import { prisma } from "../../../../../prisma/prismaClient";
import { Message } from "@prisma/client";
import bcrypt from "bcrypt";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // Get message by ID Prisma
    const messages = await prisma.message.findMany({
      where: {
        toUserId: Number(id),
      },
    });

    // sort messages into two arrays, canBeOpened (date in past or today) and cannotBeOpened (date in future)
    const canBeOpened: Message[] = [];
    const cannotBeOpened: Message[] = [];

    messages.forEach((message) => {
      const date = new Date(message.canBeOpened);
      if (date < new Date()) {
        canBeOpened.push(message);
      } else {
        cannotBeOpened.push(message);
      }
    });

    // Respond with all users
    return new Response(JSON.stringify({ canBeOpened, cannotBeOpened }), {
      status: 200,
    });
  } catch (error) {
    // Handle errors
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
