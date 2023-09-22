import { prisma } from "../../../prisma/prismaClient";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { fromUserId, toUserId, message, openDate } = await request.json();

    console.log(
      "fromUserId",
      fromUserId,
      "toUserId",
      toUserId,
      "message",
      message,
      "openDate",
      openDate
    );
    // Validate and retrieve user
    const users = await Promise.all([
      prisma.user.findUnique({
        where: { id: fromUserId as number },
      }),
      prisma.user.findUnique({
        where: { id: toUserId as number },
      }),
    ]);

    if (!users[0] || !users[1]) {
      return new Response(JSON.stringify({ error: "Invalid user" }), {
        status: 401,
      });
    }

    // Verify message length (max 1000 characters)
    if (message.length > 1000) {
      return new Response(JSON.stringify({ error: "Message too long" }), {
        status: 401,
      });
    }

    // Verify openDate is in the future and its a date in format YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(openDate)) {
      return new Response(JSON.stringify({ error: "Invalid date format" }), {
        status: 401,
      });
    }

    const date = new Date(openDate);
    if (date < new Date()) {
      return new Response(JSON.stringify({ error: "Invalid date" }), {
        status: 401,
      });
    }

    // Create message
    const newMessage = await prisma.message.create({
      data: {
        fromUser: {
          connect: {
            id: fromUserId as number,
          },
        },
        toUser: {
          connect: {
            id: toUserId as number,
          },
        },
        content: message,
        canBeOpened: new Date(openDate),
      },
    });

    // Respond with new message
    return new Response(JSON.stringify({ message: newMessage }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
