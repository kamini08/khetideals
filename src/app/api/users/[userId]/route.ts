import clientPromise from "@/lib/mongodb";
import BuyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    console.log('Received userId:', userId);
    await clientPromise(); // Ensure MongoDB connection

    // Fetch the document based on `mainId`
    const document = await BuyerMarketPlaceSub.findOne({ mainId: userId });
    // console.log("dcbiubciudbc", document);

    if (!document) {
      return NextResponse.json(
        {
          message: "Document with the specified mainId not found",
        },
        { status: 404 }
      );
    }

    // Send the document details as JSON
    return NextResponse.json(document, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
