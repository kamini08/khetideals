import clientPromise from "@/lib/mongodb";
import SharecropperModel from "@/models/shareCropper";
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
        startingMonth,
        endingMonth,
        description,
       
    } = await req.json();

    const newEntry = new SharecropperModel({
      mainId: userID,
      areaOfLand,
      location,
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

