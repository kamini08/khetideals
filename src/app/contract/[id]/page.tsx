"use client";
import { db } from "@/lib/db";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import buyer from "@/models/buyermodel";
import farmers from "@/models/farmermodel";
import Contract2 from "@/models/secondContract";
import presignedUrl from "@/lib/serverUtils/presignedUrl";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { getId } from "@/lib/serverUtils/getId";

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
const Contract2Pdf = () => {
  const [isropperrSigned, setCropperSigned] = useState(false);
  const [isLandlordSigned, setLandlordSigned] = useState(false);
  
  const [contract2, setContract2] = useState<any>();
  const [role, setRole] = useState<string | undefined>();
  const [email, setEmail] = useState<any>();
  const[presignedURL, setPresignedURL] = useState<string | undefined>();


    const pathname = usePathname();
    const contract2Id = pathname.split("/").pop();
   
useEffect(() => {
  const fetchDetails = async() => {

  
  const detail = await getId();

  const userrole = detail?.role;
  setRole(userrole);
  const userId = detail?.id;

  const useremail: any = detail?.email;
  setEmail(useremail);
  console.log(email);
  }
  
  const fetchContract2 = async() => {

  try {
    const client = await clientPromise();
    if (!client) {
      console.error("No client found");
    }
    
    const contract2Data = await Contract2.findOne({ contract2Id: contract2Id });
    if (!contract2) {
      console.log("No contract2 found");
      return NextResponse.json(
        {
          message: "No contract2 found",
        },
        {
          status: 404,
        }
      );
    }
    console.log(contract2Data);
    setContract2(contract2Data);
  } catch  (err) {
    console.log(err);
  }
} 

const fetchUrl = async() => {

try {

  const s3Url = contract2.contract2Url;

  console.log(s3Url);

  const key = getS3KeyFromUrl(s3Url);
  const response = await presignedUrl(key);
  setPresignedURL(response?.noClientUrl);
  console.log(presignedURL);
  (role == "cropper")
    ? setCropperSigned(contract2.isCropperSigned)
    : setLandlordSigned(contract2.isLandlordSigned);

  } catch (err) {
    console.log(err);
  }
}

fetchContract2();
fetchDetails();
fetchUrl();

}, []);

 
  const signContract2 = async (fileId: string | undefined) => {
    try {
      // Fetch the presigned URL from your backend API
      


      if (role == "cropper") {
        setCropperSigned(true);
        const farmerSigned = await Contract2.updateOne(
          { contract2Id: contract2Id },
          {
            $set: {
              farmerSigned: true,
            },
          }
        );
        console.log(farmerSigned);
      } else if (role == "buyer") {
        setLandlordSigned(true);
        const buyerSigned = await Contract2.updateOne(
          { contract2Id: contract2Id },
          {
            $set: {
              buyerSigned: true,
            },
          }
        );
        console.log(buyerSigned);
      }
      const response = await fetch(`/api/contract2/signContract2/${fileId}`, {
        method: "PUT",
        body: JSON.stringify({ isropperrSigned, isLandlordSigned }),
      });

      if (!response.ok) {
        throw new Error("Error signing contract2");
      }

    } catch (error) {
      console.error("Error signing contract2:", error);
    } finally {
    }
  };

  if (
    email &&
    (email == contract2.buyer.email || email == contract2.seller.email)
  ) {
    return (
      <div className="p-8 mx-auto">
        <iframe
          src={`${presignedURL}#toolbar=0&navpanes=0`}
          width="90%"
          height="600px"
        ></iframe>
        <div>
          {role == "cropper"
            ? isropperrSigned && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-auto my-3"
                  onClick={() => signContract2(contract2Id)}
                >
                  {"I Agree"}
                </button>
              )
            : isLandlordSigned && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-auto my-3"
                  onClick={() => signContract2(contract2Id)}
                >
                  {"I Agree"}
                </button>
              )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center py-20">
        <h1>Unauthorized</h1>
        <p>You do not have permission to view this contract2.</p>
      </div>
    );
  }
};

export default Contract2Pdf;
