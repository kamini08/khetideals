import clientPromise from "@/lib/mongodb";
import FarmerMarketPlaceSub from "@/models/farmermarketplace.js";
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
      description,
    } = await req.json();

    const newEntry = new FarmerMarketPlaceSub({
      mainId: userID,
      category,
      paymentTerms,
      location,
      address,
      startingMonth,
      endingMonth,
      description,
    });

    const savedEntry = await newEntry.save();
    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function PUT(req: any) {
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
      description,
    } = await req.json();

    const updatedEntry = await FarmerMarketPlaceSub.findByIdAndUpdate(
      id,
      {
        category,
        paymentTerms,
        location,
        address,
        startingMonth,
        endingMonth,
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

    return new Response(JSON.stringify({ message: "successful" }), {
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
