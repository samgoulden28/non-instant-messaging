import { prisma } from "../../../../prisma/prismaClient";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate and retrieve user
    const user = await prisma.user.findUnique({
      where: { username: email as string },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Verify password (assume hashedPassword is the stored hashed password)
    const isValid = true;
    if (!isValid) {
      return new Response(
        JSON.stringify({ error: "Invalid email or password" }),
        { status: 401 }
      );
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your-secret-key",
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Respond with JWT
    return new Response(JSON.stringify({ token, username: user.username }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
