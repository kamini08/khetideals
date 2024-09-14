import Contract2 from "../../../../models/secondContract"; // Adjust path as needed
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import generateContract2Pdf from "@/lib/clientUtils/generatePDF2";
import { auth } from "../../../../../auth";

export async function POST(request: Request) {
  if (request.method === "POST") {
    try {
      const client = await clientPromise();
      if (!client) {
        return NextResponse.json(
          {
            message: "Error connecting to the database",
          },
          {
            status: 500,
            headers: {
              "Content-Type": "text/plain",
            },
          },
        );
      }

      const req = await request.json();
      const { landholder, sharecropper, landDetails, cropCycle, financialDetails } = req;

      const session = await auth();
      const role = session?.user.id?.toLocaleLowerCase();
      const user1Id = session?.user.id;

      // Generate a unique contract2 ID
      const contract2Id = `CONTRACT2-${Date.now()}`;

      const newContract = new Contract2({
        contract2Id,
        landholder,
        sharecropper,
        landDetails,
        cropCycle,
        financialDetails,
      });

      await newContract.save();

      const res: any = await generateContract2Pdf(newContract);
      if (res) {
        return NextResponse.json(
          {
            message: "Contract2 created successfully",
            contract2: newContract,
          },
          { status: 201 }
        );
      }

    } catch (error: any) {
      console.log(error);
      return NextResponse.json(
        {
          message: "Error creating contract2",
          error: error?.message,
        },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: "Invalid request method",
        error: "Only POST requests are allowed",
      },
      { status: 405 }
    );
  }
}

export async function PUT(request: Request) {
  if (request.method === "PUT") {
    const req = await request.json();
    const contract2Id = req.contract2Id;
    const contract2Url = req.contract2Url;

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
        {
          message: "Error updating contract2",
          error: err?.message,
        },
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
