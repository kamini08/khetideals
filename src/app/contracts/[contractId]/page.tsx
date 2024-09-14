"use client";
import { db } from "@/lib/db";
import React, { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import clientPromise from "@/lib/mongodb";
import buyer from "@/models/buyermodel";
import farmers from "@/models/farmermodel";
import Contract from "@/models/contractmodel";
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
const ContractPdf = () => {
  const [isFarmerSigned, setFarmerSigned] = useState(false);
  const [isBuyerSigned, setBuyerSigned] = useState(false);
  
  const [contract, setContract] = useState<any>();
  const [role, setRole] = useState<string | undefined>();
  const [email, setEmail] = useState<any>();
  const[presignedURL, setPresignedURL] = useState<string | undefined>();


    const {contractId} : any = useParams();
    
   
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
  
  const fetchContract = async() => {

  try {
    const client = await clientPromise();
    if (!client) {
      console.error("No client found");
    }
    
    const contractData = await Contract.findOne({ contractId: contractId });
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
    console.log(contractData);
    setContract(contractData);
  } catch  (err) {
    console.log(err);
  }
} 

const fetchUrl = async() => {

try {

  const s3Url = contract.contractUrl;

  console.log(s3Url);

  const key = getS3KeyFromUrl(s3Url);
  const response = await presignedUrl(key);
  setPresignedURL(response?.noClientUrl);
  console.log(presignedURL);
  (role == "farmer")
    ? setFarmerSigned(contract.isFarmerSigned)
    : setBuyerSigned(contract.isBuyerSigned);

  } catch (err) {
    console.log(err);
  }
}

fetchContract();
fetchDetails();
fetchUrl();

}, []);

 
  const signContract = async (fileId: string | undefined) => {
    try {
      // Fetch the presigned URL from your backend API
      


      if (role == "farmer") {
        setFarmerSigned(true);
        const farmerSigned = await Contract.updateOne(
          { contractId: contractId },
          {
            $set: {
              farmerSigned: true,
            },
          }
        );
        console.log(farmerSigned);
      } else if (role == "buyer") {
        setBuyerSigned(true);
        const buyerSigned = await Contract.updateOne(
          { contractId: contractId },
          {
            $set: {
              buyerSigned: true,
            },
          }
        );
        console.log(buyerSigned);
      }
      const response = await fetch(`/api/contract/signContract/${fileId}`, {
        method: "PUT",
        body: JSON.stringify({ isFarmerSigned, isBuyerSigned }),
      });

      if (!response.ok) {
        throw new Error("Error signing contract");
      }

    } catch (error) {
      console.error("Error signing contract:", error);
    } finally {
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
                >
                  {"I Agree"}
                </button>
              )
            : isBuyerSigned && (
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-auto my-3"
                  onClick={() => signContract(contractId)}
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
        <p>You do not have permission to view this contract.</p>
      </div>
    );
  }
};

export default ContractPdf;
