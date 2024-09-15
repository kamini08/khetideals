import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Contract from "@/models/contractmodel";
import { auth } from "../../../../../auth";

export async function GET(req: Request) {
  if (req.method === "GET") {
    const session = await auth();

    const role = session?.user.role?.toLocaleLowerCase();
    const email = session?.user.email;
    console.log(email);

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
          }
        );
      }

      let pendingContracts = await Contract.find({
        $or: [
          { "buyer.email": email }, // Condition 1
          { "seller.email": email }, // Condition 2
        ],
        contractStatus: "pending",
      });
      if (!pendingContracts) {
        return NextResponse.json(
          {
            message: "No pending contracts found",
          },
          {
            status: 201,
          }
        );
      }

      let ongoingContracts = await Contract.find({
        $or: [
          { "buyer.email": email }, // Condition 1
          { "seller.email": email }, // Condition 2
        ],
        contractStatus: { $in: ["pending", "signed"] },
      });
      if (!ongoingContracts) {
        return NextResponse.json(
          {
            message: "No ongoing contracts found",
          },
          {
            status: 201,
          }
        );
      }
      let signedContracts = await Contract.find({
        $or: [
          { "buyer.email": email }, // Condition 1
          { "seller.email": email }, // Condition 2
        ],
        contractStatus: "signed",
      });
      if (!signedContracts) {
        return NextResponse.json(
          {
            message: "No signed contracts found",
          },
          {
            status: 201,
          }
        );
      }
      let completedContracts = await Contract.find({
        $or: [
          { "buyer.email": email }, // Condition 1
          { "seller.email": email },
          // Condition 2
        ],
        contractStatus: "completed",
      });
      if (!completedContracts) {
        return NextResponse.json(
          {
            message: "No completed contracts found",
          },
          {
            status: 201,
          }
        );
      }
      if (pendingContracts || signedContracts || completedContracts) {
        return NextResponse.json(
          {
            message: "Contracts Found",

            contracts: {
              pendingContracts,
              signedContracts,
              ongoingContracts,
              completedContracts,
            },
          },
          {
            status: 200,
          }
        );
      } else {
        return NextResponse.json(
          {
            message: `No Contracts found`,
          },
          {
            status: 404,
          }
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
        }
      );
    }
  } else {
    return NextResponse.json(
      {
        message: `Invalemail request method`,
      },
      {
        status: 405,
      }
    );
  }
}
