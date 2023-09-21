import { prisma } from "../../../prisma/prismaClient";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
  try {
    // Get all users from Prisma
    const users = await prisma.user.findMany();

    // Respond with all users
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    // Handle errors
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { email, password } = await request.json();

    // Validate email and password (you can add more robust validation)
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
      });
    }

    // Hash the password (using bcrypt, argon2, etc.)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in Prisma
    const newUser = await prisma.user.create({
      data: {
        username: email,
        password: hashedPassword,
      },
    });

    // Respond with the created user or a success message
    return new Response(JSON.stringify({ user: newUser }), { status: 201 });
  } catch (error) {
    // Handle errors
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
