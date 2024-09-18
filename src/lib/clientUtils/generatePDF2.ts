import { jsPDF } from "jspdf";
import autoTable, { CellDef } from "jspdf-autotable";
import AWS from "aws-sdk";
import { PutObjectRequest } from "@aws-sdk/client-s3";
import { S3 } from "aws-sdk";
import { Buffer } from "buffer";
import { NextResponse } from "next/server";
import Contract2 from "@/models/secondContract";
import clientPromise from "../mongodb";

// AWS S3 Setup
const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function generateContract2PDF(contract2: {
  landholder: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  sharecropper: {
    name: string;
    email: string;
    phoneNumber: string;
    address: string;
  };
  landDetails: {
    location: string;
    areaOfLand: number;
    soilType: string;
    cropToGrow: string;
  };
  cropCycle: {
    startingMonth: string;
    endingMonth: string;
  };
  financialDetails: {
    pricePerDecimal: number;
    totalCost: number;
    paymentTerms: string;
  };
  id: string;
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
  doc.text("Land Sharing Agreement", pageWidth / 2 + margin.left, margin.top, {
    align: "center",
  });

  // Date and introduction
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `This agreement ("Agreement") is entered into on ${currentDate} between the Landholder and the Sharecropper as per the details below:`,
    margin.left,
    margin.top + 20
  );

  // Landholder Information
  doc.setFont("helvetica", "bold");
  doc.text("Landholder Information", margin.left, margin.top + 40);
  doc.setFont("helvetica", "normal");
  doc.text(`Name: ${contract2.landholder.name}`, margin.left, margin.top + 50);
  doc.text(
    `Address: ${contract2.landholder.address}`,
    margin.left,
    margin.top + 60
  );
  doc.text(
    `Phone: ${contract2.landholder.phoneNumber}`,
    margin.left,
    margin.top + 70
  );
  doc.text(
    `Email: ${contract2.landholder.email}`,
    margin.left,
    margin.top + 80
  );

  // Sharecropper Information
  doc.setFont("helvetica", "bold");
  doc.text("Sharecropper Information", margin.left, margin.top + 100);
  doc.setFont("helvetica", "normal");
  doc.text(
    `Name: ${contract2.sharecropper.name}`,
    margin.left,
    margin.top + 110
  );
  doc.text(
    `Address: ${contract2.sharecropper.address}`,
    margin.left,
    margin.top + 120
  );
  doc.text(
    `Phone: ${contract2.sharecropper.phoneNumber}`,
    margin.left,
    margin.top + 130
  );
  doc.text(
    `Email: ${contract2.sharecropper.email}`,
    margin.left,
    margin.top + 140
  );

  // Land Details Table
  doc.setFont("helvetica", "bold");
  doc.text("Land Details", margin.left, margin.top + 160);
  autoTable(doc, {
    startY: margin.top + 170,
    head: [["Detail", "Description"]],
    body: [
      ["Location", contract2.landDetails.location],
      ["Area of Land", `${contract2.landDetails.areaOfLand} decimals`],
      ["Soil Type", contract2.landDetails.soilType],
      ["Crop to Grow", contract2.landDetails.cropToGrow],
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

  const finalY = (doc as any).lastAutoTable.finalY || margin.top + 170;

  // Financial Details Table
  doc.setFont("helvetica", "bold");
  doc.text("Financial Details", margin.left, finalY + 20);
  autoTable(doc, {
    startY: finalY + 30,
    head: [["Detail", "Amount"]],
    body: [
      [
        "Price per Decimal",
        `Rs.${contract2.financialDetails.pricePerDecimal.toFixed(2)}`,
      ],
      ["Total Cost", `Rs.${contract2.financialDetails.totalCost.toFixed(2)}`],
      ["Payment Terms", contract2.financialDetails.paymentTerms],
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

  const finalY2 = (doc as any).lastAutoTable.finalY || finalY + 30;

  // Terms and Conditions
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Terms and Conditions", margin.left, finalY2 + 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(
    `1. Crop Cycle: The crop cycle will start in ${contract2.cropCycle.startingMonth} and end in ${contract2.cropCycle.endingMonth}.`,
    margin.left,
    finalY2 + 30
  );
  doc.text(
    `2. Payment: The sharecropper will pay the landholder based on the agreed price per decimal, with the total cost amounting to $${contract2.financialDetails.totalCost.toFixed(
      2
    )}.`,
    margin.left,
    finalY2 + 40
  );
  doc.text(
    `3. Soil and Land Preparation: The landholder guarantees that the land is free of any hazards and is suitable for growing the specified crop.`,
    margin.left,
    finalY2 + 50
  );
  doc.text(
    `4. Crop Harvesting: The sharecropper will be responsible for all activities related to planting, maintaining, and harvesting the crop.`,
    margin.left,
    finalY2 + 60
  );
  doc.text(
    `5. Dispute Resolution: Any disputes arising under this Agreement will be resolved through mutual discussions or arbitration.`,
    margin.left,
    finalY2 + 70
  );
  doc.text(
    `6. Jurisdiction: This Agreement will be governed by and interpreted in accordance with the laws of the jurisdiction in which the land is located.`,
    margin.left,
    finalY2 + 80
  );

  // Signature Section
  doc.setFont("helvetica", "bold");
  doc.text("Signatures", margin.left, finalY2 + 100);
  doc.setFont("helvetica", "normal");
  doc.text(
    "Landholder Signature: _____________________________",
    margin.left,
    finalY2 + 110
  );
  doc.text("Date: _____________________________", margin.left, finalY2 + 120);
  doc.text(
    "Sharecropper Signature: _____________________________",
    margin.left,
    finalY2 + 130
  );
  doc.text("Date: _____________________________", margin.left, finalY2 + 140);

  // Save the PDF using edgestore
  /*
    const pdfBlob = doc.output('blob');
    const response = await fetch('/api/contract2/saveContract2', {
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
  // const file = doc.save('contract2_farming_agreement.pdf')

  // Convert PDF to a buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  // Upload to AWS S3
  const uploadParams: any = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `contract2s/${contract2.id}.pdf`, // Unique file name
    Body: Buffer.from(pdfBuffer),
    ContentType: "application/pdf",
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    console.log(`File uploaded successfully. ${data.Location}`);
    const contract2Id = contract2.id;
    const contract2Url = data.Location;
    const client = await clientPromise();

    const result = await Contract2.findByIdAndUpdate(
      contract2Id,
      { contract2Url }, // Add new key-value pair here
      { new: true, runValidators: true }
    );

    return NextResponse.json(
      { message: "Contract updated successfully" },
      { status: 200 }
    );

    /* API call not mandatory
    try {
      const response = await fetch(
        process.env.URL + "/api/contract2/addContract2Url",
        {
          method: "PUT",
          body: JSON.stringify(contract2Data),
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
            error: "Failed to update contract2",
          },
        });
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({
        status: 500,
        body: {
          error: "Failed to update contract2",
        },
      });
    }
      */
  } catch (error) {
    console.error(`Error uploading PDF: ${error}`);
    throw error;
  }
}
