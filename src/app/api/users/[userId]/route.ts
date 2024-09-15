import clientPromise from "@/lib/mongodb";
import BuyerMarketPlaceSub from "@/models/buyermarketplacesub.js";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import farmermarketplace from "@/models/farmermarketplace";

interface UserDetails {
  name: string | null;
  email: string | null;
  // Add other fields you need from db.user
}

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const { userId } = params;
    console.log("Received userId:", userId);
    await clientPromise();

    // Fetch user details using findUnique for a single user
    const userDetails: UserDetails | null = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        name: true,
        email: true,
        // Add other fields if needed
      },
    });
    console.log("svsd", userDetails);

    // Ensure MongoDB connection

    // Fetch the document based on `mainId` (userId)
    let document = await farmermarketplace.findOne({ mainId: userId });
    console.log("ssgegegergg", document);
    // Handle case where the document is not found
    if (!document) {
      console.log(
        "Document not found in farmermarketplace, trying BuyerMarketPlaceSub..."
      );
      document = await BuyerMarketPlaceSub.findOne({ mainId: userId });
      console.log("Buyer Marketplace Document:", document);

      // If document is still not found, return a 404 error
      if (!document) {
        return NextResponse.json(
          {
            message:
              "Document with the specified mainId not found in both collections",
          },
          { status: 404 }
        );
      }
    }

    // Combine the document and userDetails
    const combinedData = {
      ...document.toObject(), // Convert the MongoDB document to a plain JS object
      userDetails, // Attach the userDetails object (can be null)
    };
    console.log(combinedData);

    // Send the combined details as JSON
    return NextResponse.json(combinedData, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching document:", error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
