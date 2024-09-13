import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Contract from "@/models/contractmodel";
import { auth } from "../../../../../auth";

export async function GET(req: Request) {
  if (req.method === "GET") {

  const session = await auth();

  const role = session?.user.role.toLocaleLowerCase();
  const id = session?.user.id;

    // Fetch contracts from database

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
      
      let pendingContracts = await Contract.find({
        $or: [
          { "buyer.id": id },  // Condition 1
          { "seller.id": id }   // Condition 2
        ]
      });
      if (!pendingContracts) {
        return NextResponse.json({
          message: "No pending contracts found",
        }, {
          status: 201,
        });
      }
      let signedContracts = await Contract.find({
        $or: [
          { "buyer.id": id },  // Condition 1
          { "seller.id": id }   // Condition 2
        ]
      });
      if (!signedContracts) {
        return NextResponse.json({
          message: "No signed contracts found",
        }, {
          status: 201,
        });
      }
      let completedContracts = await Contract.find({
        $or: [
          { "buyer.id": id },  // Condition 1
          { "seller.id": id }   // Condition 2
        ]
      });
      if (!completedContracts) {
        return NextResponse.json({
          message: "No completed contracts found",
        }, {
          status: 201,
        });
      }
      console.log(pendingContracts);
      if (pendingContracts || signedContracts || completedContracts) {
        return NextResponse.json(
          {
            message: "Contracts Found",
            contracts: {pendingContracts, signedContracts, completedContracts},
          },
          {
            status: 200,
          },
        );
      } else {
        return NextResponse.json(
          {
            message: `No Contracts found`,
          },
          {
            status: 404,
          },
        );
      }
    } catch (err: any) {
      console.error(err);
      return NextResponse.json(
        {
          message: `Error finding contracts: ${err.message}`,
        },
        {
          status: 500,
        },
      );
    }
  } else {
    return NextResponse.json(
      {
        message: `Invalid request method`,
      },
      {
        status: 405,
      },
    );
  }
}
