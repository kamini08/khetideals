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
  buyer: { name: any; address: any };
  product: {
    name: string | number | boolean | string[] | CellDef | null;
    description: string;
    quantity: {
      toString: () => string | number | boolean | string[] | CellDef | null;
    };
    price: number;
  };
  terms: {
    deliveryDate: string | number | boolean | string[] | CellDef | null;
    deliveryMethod: string | number | boolean | string[] | CellDef | null;
    returnPolicy: string;
    additionalTerms: string;
    paymentTerms: string;
  };
  id: any;
}) {
  const doc = new jsPDF("landscape");
  const margin = { top: 20, left: 20, right: 20, bottom: 30 };
  const pageWidth =
    doc.internal.pageSize.getWidth() - margin.left - margin.right;

  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Add title heading
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(
    "Contract Farming Agreement",
    pageWidth / 2 + margin.left,
    margin.top,
    { align: "center" }
  );

  // Add introductory text
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `This Contract Farming Agreement ("Agreement") is made and entered into on this ${currentDate} by and between:`,
    margin.left,
    margin.top + 20
  );

  // Add Farmer and Buyer Information
  doc.setFontSize(12);
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

  doc.setFont("helvetica", "bold");
  doc.text("Buyer Information", margin.left, margin.top + 100);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${contract.buyer.name}`, margin.left, margin.top + 110);
  doc.text(`Address: ${contract.buyer.address}`, margin.left, margin.top + 120);
  doc.text(
    `Phone: ${contract.seller.phoneNumber}`,
    margin.left,
    margin.top + 130
  );
  doc.text(`Email: ${contract.seller.email}`, margin.left, margin.top + 140);

  // Product Details Table
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("1. Product Details", margin.left, margin.top + 150);

  autoTable(doc, {
    startY: margin.top + 160,
    head: [["Detail", "Description"]],
    body: [
      ["Name", contract.product.name],
      [
        "Description",
        doc.splitTextToSize(contract.product.description, pageWidth),
      ],
      ["Quantity", contract.product.quantity.toString()],
      ["Price", `$${contract.product.price.toFixed(2)}`],
    ],
    margin: { top: 10, left: margin.left, right: margin.right },
    styles: {
      cellPadding: 5,
      fontSize: 12,
      valign: "middle",
      overflow: "linebreak",
      minCellHeight: 10,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  // Delivery Terms Table
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("2. Delivery Terms", margin.left, margin.top + 160);

  autoTable(doc, {
    startY: margin.top + 160,
    head: [["Term", "Details"]],
    body: [
      ["Delivery Date", contract.terms.deliveryDate],
      ["Delivery Method", contract.terms.deliveryMethod],
      [
        "Return Policy",
        doc.splitTextToSize(contract.terms.returnPolicy, pageWidth),
      ],
      [
        "Additional Terms",
        doc.splitTextToSize(contract.terms.additionalTerms, pageWidth),
      ],
    ],
    margin: { top: 10, left: margin.left, right: margin.right },
    styles: {
      cellPadding: 5,
      fontSize: 12,
      valign: "middle",
      overflow: "linebreak",
      minCellHeight: 10,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  // Payment Terms Table
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("3. Payment Terms", margin.left, margin.top + 160);

  autoTable(doc, {
    startY: 170,
    head: [["Term", "Details"]],
    body: [
      [
        "Payment Terms",
        doc.splitTextToSize(contract.terms.paymentTerms, pageWidth),
      ],
      ["Payment Due Date", contract.terms.deliveryDate], // Assuming due date is the same as delivery date
    ],
    margin: { top: 10, left: margin.left, right: margin.right },
    styles: {
      cellPadding: 5,
      fontSize: 12,
      valign: "middle",
      overflow: "linebreak",
      minCellHeight: 10,
    },
    headStyles: {
      fillColor: [0, 0, 0],
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240],
    },
  });

  // Add Additional Terms
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("4. Additional Terms", margin.left, margin.top + 160);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    "[Any other agreed terms or conditions]",
    margin.left,
    margin.top + 170,
    { maxWidth: pageWidth }
  );

  // Add signature lines
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Signatures", margin.left, margin.top + 180);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Farmer Signature: _____________________________",
    margin.left,
    margin.top + 190
  );
  doc.text(
    "Date: _____________________________",
    margin.left,
    margin.top + 195
  );
  doc.text(
    "Buyer Signature: _____________________________",
    margin.left,
    margin.top + 210
  );
  doc.text(
    "Date: _____________________________",
    margin.left,
    margin.top + 225
  );

  // Add footer (if needed)
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.text(
    "This document is a legally binding agreement.",
    margin.left,
    margin.top + 245
  );

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
