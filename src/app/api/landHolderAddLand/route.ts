import clientPromise from "@/lib/mongodb";
import LandholderModel from "@/models/landHolder";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";

export async function POST(req: Request) {
  const session = await auth();

  const userID = session?.user.id;
  await clientPromise();
  try {
    const {
      areaOfLand,
      location,
      adress,
      cropToGrow,
  soilType,
      startingMonth,
      endingMonth,
      pricePerDecimal,
      
    } = await req.json();

    const newEntry = new LandholderModel({
      mainId: userID,
      areaOfLand,
      location,
      adress,
      cropToGrow,
      soilType,
      startingMonth,
      endingMonth,
      pricePerDecimal,
     
    });

    const savedEntry = await newEntry.save();
    return NextResponse.json({ status: 201 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

