import clientPromise from "@/lib/mongodb";
import buyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  const session = await auth();

  const userID = session?.user.id;
  // console.log("hello");

  await clientPromise();
  // console.log("hello");
  try {
    const {
      category,
      paymentTerms,
      location,
      address,
      startingMonth,
      endingMonth,
      minimumQuantity,
      description,
    } = await req.json();
    // console.log("i am here");
    const newEntry = new buyerMarketPlaceSub({
      mainId: userID,
      category,
      paymentTerms,
      location,
      address,
      startingMonth,
      endingMonth,
      minimumQuantity,
      description,
    });

    const savedEntry = await newEntry.save();
    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
