import Contract from "../../../../models/contractmodel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { auth } from "../../../../../auth";


export async function PUT(req: Request) {
  // Handle PATCH requests to update a contract
  if (req.method === "PUT") {
    const request = await req.json();
    const contractId = request.contractId;
    console.log(contractId);
    try {
      const client = await clientPromise();
      const session = await auth();
      const role = session?.user.role?.toLocaleLowerCase();
      console.log(role);
      if (role == "farmer") {
        const updates = { isFarmerSigned: "true" };
        await Contract.findOneAndUpdate(
          {contractId: contractId},
          updates, // Add new key-value pair here
          { new: true}
        );
      } else if(role == "buyer") {
        const updates = { isBuyerSigned: "true" };
        await Contract.findOneAndUpdate(
          {contractId: contractId},
          updates, // Add new key-value pair here
          { new: true}
        );
      } 

      const contract = await Contract.findOne({ contractId });
      
      if(contract.isFarmerSigned && contract.isBuyerSigned) {
        await Contract.findOneAndUpdate(
          {contractId: contractId},
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
