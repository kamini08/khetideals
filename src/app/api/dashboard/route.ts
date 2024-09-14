import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import clientPromise from "@/lib/mongodb";
import BuyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import FarmerMarketPlaceSub from "@/models/farmermarketplace";
import buyerMarketPlaceSub from "@/models/buyermarketplacesub.js";

// import { NextResponse } from "next/server.js";
import { auth } from "../../../../auth";
export async function GET() {
  const session = await auth();

  const userID = session?.user.id;

  try {
    const locations = await db.user.findMany({
      select: {
        latitude: true,
        longitude: true,
        id: true,
      },
    });
    // console.log(locations);

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return NextResponse.json(
      { error: "Error fetching coordinates" },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  // console.log("hello");
  await clientPromise();
  // console.log("hello");
  try {
    interface Details {
      location?: string;
      paymentTerms?: string;
      category?: string;
      minimumQuantity?: number;
      userType?: string;
    }

    // Define a type for the query object
    type Query = {
      location?: string;
      paymentTerms?: string;
      category?: string;
      minimumQuantity?: number;
      userType?: string;
    };

    const details: Details = await req.json();

    // Initialize an empty query object
    let query: Query = {};

    // Add fields to the query only if they are present in `details`
    if (details.location) {
      query.location = details.location;
    }
    if (details.paymentTerms) {
      query.paymentTerms = details.paymentTerms;
    }
    if (details.category) {
      query.category = details.category;
    }
    if (details.minimumQuantity) {
      query.minimumQuantity = details.minimumQuantity;
    }
    if (details.userType) {
      query.userType = details.userType;
    }

    // Execute the query with the constructed query object
    const collection =

      query.userType === "farmer" ? BuyerMarketPlaceSub :FarmerMarketPlaceSub ;
      console.log("Query", query);
    console.log("Collection", collection);

    // Execute the query with the selected collection
    const document = await collection.find(query);
    // console.log("casccsdcs", document);
    // Proceed if the document is found and has results
    if (document.length > 0) {
      const locations = await db.user.findMany({
        where: {
          id: document[0].mainId,
        },
        select: {
          latitude: true,
          longitude: true,
        },
      });
      return new Response(JSON.stringify(locations), { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
