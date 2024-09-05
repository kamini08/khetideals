import clientPromise from "@/lib/mongodb";
import buyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";
export async function POST(req: Request) {
  const session = await auth();

  const userID = session?.user.id;

  await clientPromise();

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
    return NextResponse.json(savedEntry, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req: Request) {
  try {
    await clientPromise();

    const {
      id,
      category,
      paymentTerms,
      location,
      address,
      startingMonth,
      endingMonth,
      minimumQuantity,
      description,
    } = await req.json();

    const updatedEntry = await buyerMarketPlaceSub.findByIdAndUpdate(
      id,
      {
        category,
        paymentTerms,
        location,
        address,
        startingMonth,
        endingMonth,
        minimumQuantity,
        description,
      },
      { new: true }
    );

    if (!updatedEntry) {
      return new Response(
        JSON.stringify({ message: "Buyer profile not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(updatedEntry), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
