import { NextRequest } from "next/server";
import { prisma } from "../../../../prisma/prismaClient";

export async function GET(
  request: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    // Get message by ID Prisma
    const message = await prisma.message.findUnique({
      where: {
        id: Number(id),
      },
    });

    // Respond with all users
    return new Response(JSON.stringify({ message }), { status: 200 });
  } catch (error) {
    // Handle errors
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
