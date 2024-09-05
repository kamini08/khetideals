import clientPromise from "@/lib/mongodb";
import FarmerMarketPlaceSub from "@/models/farmermarketplace.js";
import { NextResponse } from "next/server.js";

export async function POST(req: Request) {
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
      category,
      paymentTerms,
      location,
      address,
      startingMonth,
      endingMonth,
      description,
    });
    const savedEntry = await newEntry.save();
    return NextResponse.json(savedEntry, { status: 201 });
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
      monthRange,
      description,
    } = await req.json();

    const updatedEntry = await FarmerMarketPlaceSub.findByIdAndUpdate(
      id,
      {
        category,
        paymentTerms,
        location,
        address,
        monthRange,
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
