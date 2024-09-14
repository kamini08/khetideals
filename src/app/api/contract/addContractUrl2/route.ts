import Contract2 from "@/models/secondContract";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function PUT(request: Request) {
  // Handle PATCH requests to update a contract2
  if (request.method === "PUT") {
    const req = await request.json();
    console.log(req);
    const contract2Id = req.contract2Id;
    console.log(contract2Id);

    const contract2Url = req.contract2Url;
    console.log(contract2Url);

    try {
      const client = await clientPromise();
  
        const result = await Contract2.findByIdAndUpdate(
          contract2Id,
          { contract2Url }, // Add new key-value pair here
          { new: true, runValidators: true }
        );

      return NextResponse.json(
        { message: "Contract2 updated successfully" },
        { status: 200 }
      );
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { message: "Error updating contract2", error: err?.message },
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
