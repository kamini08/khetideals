import { jsPDF } from "jspdf";
import autoTable, { CellDef } from "jspdf-autotable";
import AWS from "aws-sdk";
import { PutObjectRequest } from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import Contract from "@/models/contractmodel";
import clientPromise from "../mongodb";

// AWS S3 Setup
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function generateContractPDF(contract: {
  seller: { name: any; address: any; phoneNumber: any; email: any };
  buyer: { name: any; address: any; phoneNumber: any; email: any };
  product: {
    name: string;
    description: string;
    quantity: number;
    price: number;
    totalPrice: number;
  };
  terms: {
    deliveryDate: string;
    deliveryLocation: string;
    paymentTerms: string;
    returnPolicy: string;
    additionalTerms: string;
  };
  id: any;
}) {
  const doc = new jsPDF("landscape");
  const margin = { top: 20, left: 20, right: 20, bottom: 30 };
  const pageWidth =
    doc.internal.pageSize.getWidth() - margin.left - margin.right;

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Title
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(
    "Contract Farming Agreement",
    pageWidth / 2 + margin.left,
    margin.top,
    { align: "center" }
  );

  // Date and introduction
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `This agreement ("Agreement") is entered into on ${currentDate} between the Farmer and the Buyer as per the details below:`,
    margin.left,
    margin.top + 20
  );

  // Farmer Information
  doc.setFont("helvetica", "bold");
  doc.text("Farmer Information", margin.left, margin.top + 40);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${contract.seller.name}`, margin.left, margin.top + 50);
  doc.text(`Address: ${contract.seller.address}`, margin.left, margin.top + 60);
  doc.text(
    `Phone: ${contract.seller.phoneNumber}`,
    margin.left,
    margin.top + 70
  );
  doc.text(`Email: ${contract.seller.email}`, margin.left, margin.top + 80);

  // Buyer Information
  doc.setFont("helvetica", "bold");
  doc.text("Buyer Information", margin.left, margin.top + 100);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${contract.buyer.name}`, margin.left, margin.top + 110);
  doc.text(`Address: ${contract.buyer.address}`, margin.left, margin.top + 120);
  doc.text(
    `Phone: ${contract.buyer.phoneNumber}`,
    margin.left,
    margin.top + 130
  );
  doc.text(`Email: ${contract.buyer.email}`, margin.left, margin.top + 140);

  // Product Details
  doc.setFont("helvetica", "bold");
  doc.text("Product Details", margin.left, margin.top + 160);
  autoTable(doc, {
    startY: margin.top + 170,
    head: [["Detail", "Description"]],
    body: [
      ["Name", contract.product.name],
      ["Description", contract.product.description],
      ["Quantity", `${contract.product.quantity} units`],
      ["Price per unit", `Rs.${contract.product.price.toFixed(2)}`],
      ["Total Price", `RS.${contract.product.totalPrice.toFixed(2)}`],
    ],
    margin: { left: margin.left, right: margin.right },
    styles: {
      fontSize: 12,
      cellPadding: 5,
      minCellHeight: 10,
      overflow: "linebreak",
    },
    headStyles: { fillColor: [0, 0, 0], textColor: [255, 255, 255] },
    alternateRowStyles: { fillColor: [240, 240, 240] },
  });

  // Get the Y position where the last table ended
  const finalY = (doc as any).lastAutoTable.finalY || margin.top + 170;

  // Terms and Conditions
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Terms and Conditions", margin.left, finalY + 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `1. Delivery Date: ${contract.terms.deliveryDate}`,
    margin.left,
    finalY + 30
  );
  doc.text(
    `2. Delivery Location: ${contract.terms.deliveryLocation}`,
    margin.left,
    finalY + 40
  );
  doc.text(
    `3. Payment Terms: ${contract.terms.paymentTerms}`,
    margin.left,
    finalY + 50
  );
  doc.text(
    `4. Return Policy: ${contract.terms.returnPolicy}`,
    margin.left,
    finalY + 60
  );
  doc.text(
    `5. Additional Terms: ${contract.terms.additionalTerms}`,
    margin.left,
    finalY + 70
  );

  // Signature Section
  doc.setFont("helvetica", "bold");
  doc.text("Signatures", margin.left, finalY + 90);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Farmer Signature: _____________________________",
    margin.left,
    finalY + 100
  );
  doc.text("Date: _____________________________", margin.left, finalY + 110);
  doc.text(
    "Buyer Signature: _____________________________",
    margin.left,
    finalY + 130
  );
  doc.text("Date: _____________________________", margin.left, finalY + 140);

  // Save the PDF using edgestore
  /*
    const pdfBlob = doc.output('blob');
    const response = await fetch('/api/contract/saveContract', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/pdf'
        },
        body: pdfBlob
    });

    if (response.ok) {
        console.log('PDF successfully stored!');
    } else {
        console.error('Failed to store PDF.');
    }
*/
  // const file = doc.save('contract_farming_agreement.pdf')

  // Convert PDF to a buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  // Upload to AWS S3
  const uploadParams: any = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `contracts/${contract.id}.pdf`, // Unique file name
    Body: Buffer.from(pdfBuffer),
    ContentType: "application/pdf",
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log(`File uploaded successfully. ${data.Location}`);
    const contractId = contract.id;
    const contractUrl = data.Location;
    const contractData = { contractId, contractUrl };
    const client = await clientPromise();

    const result = await Contract.findByIdAndUpdate(
      contractId,
      { contractUrl }, // Add new key-value pair here
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { message: "Contract updated successfully" },
      { status: 200 }
    );

    /* API call not mandatory
    try {
      const response = await fetch(
        process.env.URL + "/api/contract/addContractUrl",
        {
          method: "PUT",
          body: JSON.stringify(contractData),
        }

      );
      

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        return NextResponse.json({
          status: 200,
          body: result,
        });
      } else {
        return NextResponse.json({
          status: 500,
          body: {
            error: "Failed to update contract",
          },
        });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({
        status: 500,
        body: {
          error: "Failed to update contract",
        },
      });
    }
      */
  } catch (error) {
    console.error(`Error uploading PDF: ${error}`);
    throw error;
  }
}
