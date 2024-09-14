import { NextResponse } from "next/server";
import serverClient from "../../../../../lib/serverUtils/stream"; // Import GetStream server-side client

export async function GET(req: Request) {
  const parts = req.url.split("/");
  const userId = parts[parts.length - 1].toString();
  try {
  if (!userId) {
    return NextResponse.json(
      {
        error: "Missing required parameter: userId",
      },
      { status: 400 }
    );
  }


    // Generate a token for the user
    const token = serverClient.createToken(userId);
    console.log(token);
    // Return the token to the client
    return NextResponse.json(
      {
        token: token,
      },

      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error generating token:", error);
    return NextResponse.json(
      {
        error: "Error generating token",
      },
      {
        status: 400,
      }
    );
  }
}
