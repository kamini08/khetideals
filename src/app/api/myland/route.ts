import clientPromise from "@/lib/mongodb";
import LandholderModel from "@/models/landHolder"; // Replace with your model
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

export async function GET(req: Request) {
    const session = await auth();
    const mainId = session?.user.id;
    const name=session?.user.name;
    const email=session?.user.email;
try {
    // Connect to MongoDB
    await clientPromise();

    // Query the database to find all entries with the matchi const document = await SharecropperModel.findOne({ mainId: mainId });
    const document = await LandholderModel.find({ mainId: mainId });


    if (!document) {
        return new Response(
            JSON.stringify({
                message: "Document with the specified mainId not found",
            }),
            { status: 404 }
        );
    }
    // Return the data as JSON
    return new Response(JSON.stringify({document,name,email}), { status: 200 });
} catch (error: any) {
    console.error("Error fetching document:", error);
    return new Response(JSON.stringify({ message: error.message }), {
        status: 400,
    });
}
}
