import { NextResponse } from "next/server";
import serverClient from "../../../../lib/serverUtils/stream"; // Server-side GetStream client

export async function POST(req: Request) {
  const { farmerId, buyerId } = await req.json();

  if (!farmerId || !buyerId) {
    return NextResponse.json(
      {
        error: "Farmer ID and Buyer ID are required",
      },
      { status: 400 }
    );
  }

  try {
    const channel = serverClient.channel("messaging", {
      members: [farmerId, buyerId],
    });

    await channel.create();
    return NextResponse.json(
      {
        message: "Channel created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating channel:", error);
    return NextResponse.json(
      {
        error: "Error creating channel",
      },
      { status: 500 }
    );
  }
}
