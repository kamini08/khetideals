import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";
import Feedback from "@/models/feedback";

export async function POST(req: Request) {
  const session = await auth();

  const userID = session?.user.id;

  await clientPromise();

  try {
    const {
      farmerName,
      farmerEmail,
      rating,
      timeliness,
      cropQuality,
      communication,
      landlordName,
      landlordEmail,
      feedback
    } = await req.json();

    const newEntry = new Feedback({
      mainId: userID,
      farmerName,
      farmerEmail,
      rating,
      timeliness,
      cropQuality,
      communication,
      landlordName,
      landlordEmail,
      feedback,
    });

    const savedEntry = await newEntry.save();
    return NextResponse.json({ status: 201, data: savedEntry });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
