"use server"

import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

import { StreamChat } from "stream-chat";

// Initialize GetStream server-side client

export async function GET(req: Request) {
  const apiKey: string = process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY
  ? process.env.NEXT_PUBLIC_REACT_APP_STREAM_KEY
  : "";
const serverClient = StreamChat.getInstance(
  apiKey,
  process.env.REACT_APP_STREAM_SECRET
);
  try {

    const session = await auth();

    const userId: any = session?.user.id;
    console.log(userId);
    const name: any = session?.user.name;
    const otherId: any = req.url.split("/").pop();
    console.log(otherId);
    const token1 = serverClient.createToken(userId);
    const token2 = serverClient.createToken(otherId);

    return NextResponse.json({
      userToken: token1,
      userId: userId,
      userToken2: token2,
      name,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
    });
  }
}
