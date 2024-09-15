import clientPromise from "@/lib/mongodb"; // Ensure you have a MongoDB connection utility
import LandholderModel from "@/models/landHolder";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface UserDetails {
  id: string;
  name: string | null;
  email: string | null;
  // Add other fields you need from db.user
}
export async function GET() {
  await clientPromise();
  try {
    // Fetch all landholders from the database
    const landholders = await LandholderModel.find({});
    console.log(landholders);
    const mainIds = landholders
      .map((landholder: any) => landholder.mainId)
      .filter((id: string | undefined): id is string => id !== undefined);
      console.log(mainIds);
    const userDetails: UserDetails[] = await db.user.findMany({
      where: {
        id: {
          in: mainIds, // Use the array of mainIds
        },
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });
    console.log("fcvgbhnj",userDetails)
    const combinedData = landholders.map((landholder: any) => ({
      ...landholder.toJSON(), // Convert Mongoose document to plain JS object
      userDetails: userDetails.find((user) => user.id === landholder.mainId), // Find matching user by id
    }));
    console.log(combinedData);

    // Return the landholders as a JSON response
    return NextResponse.json(combinedData, { status: 200 });
  } catch (error: any) {
    // Return an error message as a JSON response
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  await clientPromise();
  try {
    // Define the expected request body structure
    interface Details {
      location?: string;
      cropType?: string;
      area?: string;
      pricePerDecimal?: number;
    }

    // Define the structure for the query object
    type Query = {
      location?: object;
      cropType?: string;
      areaOfLand?: object;
      pricePerDecimal?: object;
    };

    const details: Details = await req.json();
    console.log("acaas", details);
    // Initialize an empty query object
    let query: Query = {};

    // Add location to query if provided
    if (details.location) {
      query.location = { $regex: details.location.trim(), $options: "i" }; // Case-insensitive search
    }

    // Add cropType to query if provided
    if (details.cropType) {
      query.cropType = details.cropType;
    }

    // Add area range query if provided and valid
    if (details.area) {
      const areaValue = Number(details.area); // Convert area to a number
      if (!isNaN(areaValue)) {
        query.areaOfLand = { $gte: areaValue }; // Only add to query if the value is valid
      }
    }

    // Add pricePerDecimal range query if provided
    if (details.pricePerDecimal) {
      const priceValue = Number(details.pricePerDecimal);
      if (!isNaN(priceValue)) {
        query.pricePerDecimal = { $gte: priceValue }; // Greater than or equal to the provided price
      }
    }

    console.log("Query:", query);

    // Execute the query on the LandholderModel collection
    const documents = await LandholderModel.find(query);

    console.log("Documents Found:", documents);

    // Return the documents as a JSON response
    return new Response(JSON.stringify(documents), { status: 200 });
  } catch (error: any) {
    // Handle errors during query or parsing
    console.error("Error:", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
