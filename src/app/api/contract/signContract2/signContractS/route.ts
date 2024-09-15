import Contract from "@/models/contractmodel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { auth } from "../..//../../../../auth";
import Contract2 from "@/models/secondContract";

export async function PUT(req: Request) {
  // Handle PATCH requests to update a contract
  if (req.method === "PUT") {
    const request = await req.json();
    const contract2Id = request.contractId;
    
    try {
      const client = await clientPromise();
    
   
        const updates = { isCropperSigned: "true" };
        await Contract2.findOneAndUpdate(
          {contract2Id: contract2Id},
          updates, // Add new key-value pair here
          { new: true}
        );
      

      const contract = await Contract2.findOne({ contract2Id :  contract2Id});

      if(contract.isCropperSigned && contract.isLandlordSigned) {
        await Contract2.findOneAndUpdate(
          {contract2Id: contract2Id},
          { contractStatus: "signed" }, // Add new key-value pair here
          { new: true }
        );
      }

      return NextResponse.json(
        { message: "Contract updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.error(err);
      return NextResponse.json(
        
        { message: "Error updating contract", err},
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
