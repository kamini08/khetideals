import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";
import SharecropperModel from "@/models/shareCropper";

export async function PUT(req: Request) {
  const session = await auth();
  const mainId = session?.user.id;

  try {
    await clientPromise(); // Ensure MongoDB connection

    const {
        areaOfLand,
        location,
        startingMonth,
        endingMonth,
        description,
    } = await req.json();

    // Find the document using `mainId` field
    const existingEntry = await SharecropperModel.findOne({
      mainId: mainId,
    });

    if (!existingEntry) {
      return new Response(
        JSON.stringify({
          message: "Document with the specified mainId not found",
        }),
        { status: 404 }
      );
    }

    // Update the document's attributes
    existingEntry.areaOfLand = areaOfLand || existingEntry.areaOfLand;
    existingEntry.location = location || existingEntry.location;
    existingEntry.startingMonth = startingMonth || existingEntry.startingMonth;
    existingEntry.endingMonth = endingMonth || existingEntry.endingMonth;

    existingEntry.description = description || existingEntry.description;

    // Save the updated document
    const updatedEntry = await existingEntry.save();

    return new Response(JSON.stringify(updatedEntry), { status: 200 });
  } catch (error: any) {
    console.error("Error during update:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
