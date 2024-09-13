import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import Contract from "@/models/contractmodel";
import clientPromise from "@/lib/mongodb";
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const bucketName = process.env.S3_BUCKET_NAME;
import presignedUrl from "@/lib/serverUtils/presignedUrl";

function getS3KeyFromUrl(s3Url: string): string | null {
  try {
    // Parse the URL
    const url = new URL(s3Url);

    // Ensure this is an S3 URL (it should contain 's3' in the hostname)
    if (!url.hostname.includes("s3")) {
      console.error("Not a valid S3 URL");
      return null;
    }

    // Extract the key (everything after the bucket and domain)

    const key = url.pathname.substring(1); // Remove leading slash from pathname

    return key;
  } catch (error) {
    console.error("Invalid URL:", error);
    return null;
  }
}

export async function GET(req: Request) {
  const parts = req.url.split("/");
  const contractId = parts[parts.length - 1].toString();

  try {
    const client = await clientPromise();

    const contract = await Contract.findOne({ contractId: contractId });
    if (!contract) {
      console.log("No contract found");
      return NextResponse.json(
        {
          message: "No contract found",
        },
        {
          status: 404,
        }
      );
    }

    const s3Url = contract.contractUrl;
   

    const key = getS3KeyFromUrl(s3Url);


    const response = await presignedUrl(key);
    
    const presignedURL = response?.noClientUrl;

    return NextResponse.json(
      {
        presignedUrl: presignedURL,
      },
      {
        status: 200,
      });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to get S3 key from URL" },
      { status: 500 }
    );
  }
}
