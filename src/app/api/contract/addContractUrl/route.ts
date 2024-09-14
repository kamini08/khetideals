import Contract from "@/models/contractmodel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { redirect } from "next/dist/server/api-utils";
import { contractValidate } from "../../../../lib/serverUtils/validate";
import generateContractPdf from "../../../../lib/clientUtils/generatePDF";

export async function PUT(request: Request) {
  // Handle PATCH requests to update a contract
  if (request.method === "PUT") {
    const req = await request.json();
    // console.log(req);
    const contractId = req.contractId;
    // console.log(contractId);

    const contractUrl = req.contractUrl;
    // console.log(contractUrl);

    try {
      const client = await clientPromise();

      const result = await Contract.findByIdAndUpdate(
        contractId,
        { contractUrl }, // Add new key-value pair here
        { new: true, runValidators: true }
      );

      return NextResponse.json(
        { message: "Contract updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { message: "Error updating contract", error: err?.message },
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
