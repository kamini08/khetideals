import Contract from "../../../../models/contractmodel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { contractValidate } from "../../../../lib/serverUtils/validate";
import generateContractPdf from "../../../../lib/clientUtils/generatePDF";

export async function PUT(req: Request) {
  // Handle PATCH requests to update a contract
  if (req.method === "PUT") {
    const request = await req.json();
    const {user, isFarmerSigned, isBuyerSigned} = request;
    const parts = req.url.split("/");
    const contractId = parts[parts.length - 1].toString();
    console.log(contractId);
    
    try {
      const client = await clientPromise();

      if (isFarmerSigned) {
        await Contract.findByIdAndUpdate(
          contractId,
          { isFarmerSigned }, // Add new key-value pair here
          { new: false, runValidators: true }
        );
      } else if(isBuyerSigned) {
        await Contract.findByIdAndUpdate(
          contractId,
          { isBuyerSigned }, // Add new key-value pair here
          { new: false, runValidators: true }
        );
      }

      const contract = await Contract.findOne({ contractId });

      if(contract.isFarmerSigned && contract.isBuyerSigned) {
        const contractStatus = "signed";
        await Contract.findByIdAndUpdate(
          contractId,
          { contractStatus }, // Add new key-value pair here
          { new: false, runValidators: true }
        );
      }

      return NextResponse.json(
        { message: "Contract updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { message: "Error updating contract", error: err.message },
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
