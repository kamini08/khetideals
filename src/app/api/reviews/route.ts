import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";
import Feedback from "@/models/feedback";

export async function GET(req: Request) {
  const session = await auth();
  const email = session?.user.email;

  try {
    await clientPromise(); // Ensure MongoDB connection

    // Extract `mainId` from query parameters if provided, or use session ID

    // Fetch the document based on `mainId`
    const document = await Feedback.find({ farmerEmail: email });
console.log(document);
    if (!document) {
      return new Response(
        JSON.stringify({
          message: "Document with the specified mainId not found",
        }),
        { status: 404 }
      );
    }

    // Send the document details as JSON
    return NextResponse.json({document}, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching document:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
}
