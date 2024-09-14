"use client";
import React, { useEffect } from "react";

import { useState } from "react";
import Pdf from "@/components/contract/PDFImage";
import { useRouter } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import buyer from "@/models/buyermodel";
import farmers from "@/models/farmermodel";
import Contract from "@/models/contractmodel";
import presignedUrl from "@/lib/serverUtils/presignedUrl";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

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
const ContractPdf = async () => {
  const [loading, setLoading] = useState(false);
  const [isFarmerSigned, setFarmerSigned] = useState(false);
  const [isBuyerSigned, setBuyerSigned] = useState(false);
  const [contractId, setContractId] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      const dynamicId = pathParts[pathParts.length - 1];
      setContractId(dynamicId);
      console.log(dynamicId);
    }
  }, []);

  const router = useRouter();
  const session = await auth();

  const role = session?.user.role.toLocaleLowerCase();
  const userId = session?.user.id;
  const email = session?.user.email
  try {
    await clientPromise();
    const user = await buyer.findOne({
      mainId: userId
    })? buyer.findOne({
      mainId: userId
    }) : farmers.findOne({
      mainId: userId
    })
    setUser(await user);
   
  } catch(err) {
    console.log(err);
  }

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

  console.log(s3Url);

    const key = getS3KeyFromUrl(s3Url);
    const response = await presignedUrl( key );
    const presignedURL = response?.noClientUrl;
    console.log(presignedURL);
    role=="farmer"? setFarmerSigned(contract.isFarmerSigned): setBuyerSigned(contract.isBuyerSigned);
    

  const signContract = async (fileId: string) => {
    setLoading(true);
    try {
      // Fetch the presigned URL from your backend API

      if (role == "farmer") {
        setFarmerSigned(true);
      } else if (role == "buyer") {
        setBuyerSigned(true);
      }
      const response = await fetch(`/api/contract/signContract/${fileId}`, {
        method: "PUT",
        body: JSON.stringify({ user, isFarmerSigned, isBuyerSigned }),
      });

      if (!response.ok) {
        throw new Error("Error signing contract");
      }
      setLoading(false);
      router.push("/contracts");
    } catch (error) {
      console.error("Error signing contract:", error);
    } finally {
      setLoading(false);
    }
  };

  if (
    email &&
    (email == contract.buyer.email || email == contract.seller.email)
  ) {
    return (
      <div className="p-8 mx-auto">
        <iframe
          src={`${presignedURL}#toolbar=0&navpanes=0`}
          width="90%"
          height="600px"
        ></iframe>
        <div>
          {role == "farmer"
            ? isFarmerSigned && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-auto my-3"
                  onClick={() => signContract(contractId)}
                  disabled={loading}
                >
                  {loading ? "Signing Contract..." : "I Agree"}
                </button>
              )
            : isBuyerSigned && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-auto my-3"
                  onClick={() => signContract(contractId)}
                  disabled={loading}
                >
                  {loading ? "Signing Contract..." : "I Agree"}
                </button>
              )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center py-20">
        <h1>Unauthorized</h1>
        <p>You do not have permission to view this contract.</p>
      </div>
    );
  
  }
};

export default ContractPdf;
