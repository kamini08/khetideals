import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import Contract2 from "@/models/secondContract";
import clientPromise from "@/lib/mongodb";
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const bucketName = process.env.S3_BUCKET_NAME;

export async function POST(req: Request) {
    const parts = req.url.split("/");
    const contract2Id = parts[parts.length - 1].toString();

    try {
        const client = await clientPromise();
        const updates = { contract2Status: "cancelled" }; // Fields to update



        const contract2 = await Contract2.findOneAndUpdate({ contract2Id: contract2Id }, updates, { new: true })
            .then((updatedContract2: any) => {
                console.log("Updated Contract2");
            })
            .catch(err => {
                console.error("Error updating contract2:", err);
            });

    }
    catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to cancel the contract2..." },
            { status: 500 },);
    }



    return NextResponse.json({
        message: "Contract2 cancelled!",
    });

}
