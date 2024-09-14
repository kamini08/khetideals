import clientPromise from "@/lib/mongodb";
import BuyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../../auth";
import { getUserById } from "../../../../../data/user";

export async function GET(req: Request) {
  try {
    const session = await auth();
    const mainId: any = session?.user.id;
    const user = await getUserById(mainId);
    console.log(user);
    // Send the document details as JSON
    return NextResponse.json(
      {
        user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching document:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
