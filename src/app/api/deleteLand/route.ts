import clientPromise from "@/lib/mongodb";
import LandholderModel from "@/models/landHolder";
import { NextResponse } from "next/server.js";

export async function DELETE(req: Request) {
  try {
    // Parse the request body or URL parameters to get the `mainId`
    const { searchParams } = new URL(req.url);
    const mainId = searchParams.get('mainId');

    if (!mainId) {
      return new Response(
        JSON.stringify({ message: "mainId is required" }),
        { status: 400 }
      );
    }

    await clientPromise(); // Ensure MongoDB connection

    // Find and delete the document based on `mainId`
    const deletedDocument = await LandholderModel.findOneAndDelete({ _id: mainId });

    if (!deletedDocument) {
      return new Response(
        JSON.stringify({
          message: "Document with the specified mainId not found",
        }),
        { status: 404 }
      );
    }

    // Send a response after deletion
    return new Response(
      JSON.stringify({
        message: "Document deleted successfully",
        deletedDocument,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting document:", error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
