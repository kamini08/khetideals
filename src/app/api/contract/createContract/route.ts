import Contract from "../../../../models/contractmodel";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { redirect } from "next/dist/server/api-utils";
import { contractValidate } from "../../../../lib/serverUtils/validate";
import generateContractPdf from "../../../../lib/clientUtils/generatePDF";
import { AnyAaaaRecord } from "dns";
import { auth } from "../../../../../auth";
import Farmer from "../../../../models/farmermodel";
import Buyer from "../../../../models/buyermodel";


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
      
      const { buyer, seller, product, terms } = req;
      const session = await auth();
      const role = session?.user.id?.toLocaleLowerCase();
      const user1Id = session?.user.id;

      

    /*  const { buyer, seller, product, terms } = {
        buyer: {
          name: "John Doe",
          email: "john@example.com",
          phoneNumber: "1234567890",
          address: "123 Main St",
          Account: 123456,
        },
        seller: {
          name: "Jane Smith",
          email: "jane@example.com",
          phoneNumber: "0987654321",
          address: "456 Elm St",
          Account: 654321,
        },
        product: {
          name: "Corn",
          description: "High quality corn",
          quantity: 100,
          price: 500,
          totalprice: 50000,
        },
        terms: {
          paymentTerms: "50% upfront, 50% on delivery",
          deliveryDate: "2024-12-31",
          deliveryMethod: "Shipping",
          returnPolicy: "No returns",
          additionalTerms: "None",
        },
      };
    */
      // Generate a unique contract ID
      const contractId = `CONTRACT-${Date.now()}`;

      const newContract = new Contract({
        contractId,
        buyer,
        seller,
        product,
        terms,
      });
      await newContract.save();

      const res: any = await generateContractPdf(newContract);
      if(res) {
      return NextResponse.json(
        { message: "Contract created successfully",
          contract: newContract,
         },
        { status: 201 }
      );
    }

    } catch (error: any) {
      console.log(error);
      return NextResponse.json(
        
        { message: "Error creating contract", error: error?.message },
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
  // Handle PATCH requests to update a contract
  if (request.method === "PUT") {
    const req = await request.json();
    console.log(req);
    const contractId = req.contractId;
    console.log(contractId);

    const contractUrl = req.contractUrl;
    console.log(contractUrl);

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
