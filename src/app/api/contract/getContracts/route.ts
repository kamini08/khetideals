import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import Contract from "../../../../models/contractmodel";

export async function GET(req: Request) {
  if (req.method === "GET") {

    //const session = await auth();

  // const user = session?.user.role.toLocaleLowerCase();
  // const userId = session?.user.mainId.;
  const userId = "098765";
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
      
      let contracts = await Contract.find({
        "buyer.id": userId,
      });
      if (!contracts) {
        contracts = await Contract.find({
          "farmer.id": userId,
        });
      }
      console.log(contracts);
      if (contracts) {
        return NextResponse.json(
          {
            message: "Contracts Found",
            contracts: contracts,
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
