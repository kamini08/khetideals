import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import Contract from "@/models/contractmodel";
import clientPromise from "@/lib/mongodb";
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const bucketName = process.env.S3_BUCKET_NAME;

export async function POST(req: Request) {
    const parts = req.url.split("/");
    const contractId = parts[parts.length - 1].toString();

    try {
        const client = await clientPromise();
        const updates = { contractStatus: "cancelled" }; // Fields to update



        const contract = await Contract.findOneAndUpdate({ contractId: contractId }, updates, { new: true })
            .then((updatedContract: any) => {
                console.log("Updated Contract");
            })
            .catch(err => {
                console.error("Error updating contract:", err);
            });

    }
    catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to cancel the contract..." },
            { status: 500 },);
    }



    return NextResponse.json({
        message: "Contract cancelled!",
    });

}
