import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import Contract2 from "@/models/secondContract";
import { auth } from "../../../../../auth";

export async function GET(req: Request) {
  if (req.method === "GET") {
    const session = await auth();

    const role = session?.user.role?.toLocaleLowerCase();
    const email = session?.user.email;

    // Fetch contracts from database
console.log(email)
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

      let pendingContracts = await Contract2.find({
        $or: [
          { "landholder.email": email }, // Condition 1
          { "sharecropper.email": email }, // Condition 2
        ],
        contract2Status: "pending",
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

      let ongoingContracts = await Contract2.find({
        $or: [
          { "landholder.email": email }, // Condition 1
          { "sharecropper.email": email }, // Condition 2
        ],
        contract2Status: { $in: ["pending", "signed"] },
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
      let signedContracts = await Contract2.find({
        $or: [
          { "landholder.email": email }, // Condition 1
          { "sharecropper.email": email }, // Condition 2
        ],
        contract2Status: "signed",
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
      let completedContracts = await Contract2.find({
        $or: [
          { "landholder.email": email }, // Condition 1
          { "sharecropper.email": email },
          // Condition 2
        ],
        contract2Status: "completed",
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
      if (pendingContracts || signedContracts || completedContracts || ongoingContracts) {
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
