import Contract from "../../../../models/contractmodel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function PUT(req: Request) {
  // Handle PATCH requests to update a contract
  if (req.method === "PUT") {
    const request = await req.json();
    const contractId = request.contractId;
    const paymentId = request.paymentIntent;
    console.log(contractId);
    try {
      const client = await clientPromise();

      console.log(contractId);

      const updates = { contractStatus: "completed", paymentStatus: "paid" };
      await Contract.findOneAndUpdate(
        { contractId: contractId },
        updates, // Add new key-value pair here
        { new: true }
      );
      console.log("Contract updated successfully");

      return NextResponse.json(
        { message: "Contract updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.error(err);
      return NextResponse.json(
        { message: "Error updating contract", err },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Invalid request method",
        error: "Only PUT requests are allowed",
      },
      { status: 405 }
    );
  }
}
