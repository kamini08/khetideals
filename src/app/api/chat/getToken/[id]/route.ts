import serverClient from "@/lib/serverUtils/stream"; // Ensure your stream client setup
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";

export async function GET(req: Request) {
  try {
    const session = await auth();

    const userId: any = session?.user.id;
    const name: any = session?.user.name;
    const otherId: any = req.url.split("/").pop();

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
