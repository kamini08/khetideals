import Contract2 from "../../../../models/secondContract";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function PUT(req: Request) {
  // Handle PATCH requests to update a contract2
  if (req.method === "PUT") {
    const request = await req.json();
    const {user, isCropperSigned, isLandlordSigned} = request;
    const parts = req.url.split("/");
    const contract2Id = parts[parts.length - 1].toString();
    console.log(contract2Id);
    
    try {
      const client = await clientPromise();

      if (isCropperSigned) {
        await Contract2.findByIdAndUpdate(
          contract2Id,
          { isCropperSigned }, // Add new key-value pair here
          { new: true, runValidators: true }
        );
      } else if(isLandlordSigned) {
        await Contract2.findByIdAndUpdate(
          contract2Id,
          { isLandlordSigned }, // Add new key-value pair here
          { new: true, runValidators: true }
        );
      }

      const contract2 = await Contract2.findOne({ contract2Id });

      if(contract2.isCropperSigned && contract2.isLandlordSigned) {
        const contract2Status = "signed";
        await Contract2.findByIdAndUpdate(
          contract2Id,
          { contract2Status }, // Add new key-value pair here
          { new: false, runValidators: true }
        );
      }

      return NextResponse.json(
        { message: "Contract2 updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { message: "Error updating contract2", error: err.message },
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