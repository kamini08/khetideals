"use client";
import { useEffect, useState } from "react";

const Contracts = () => {
  const [loading, setLoading] = useState(false);

  const downloadPdf = async (fileName: string) => {
    setLoading(true);
    try {
      // Fetch the presigned URL from your backend API
      const response = await fetch(`/api/contract/download/${fileName}`);

      const res = await response.json();

      const presignedUrl = JSON.parse(JSON.stringify(res)).presignedUrl;

      console.log(presignedUrl);
      if (presignedUrl) {
        // Create a temporary link to trigger the download
        const link = document.createElement("a");
        link.href = presignedUrl;
        link.setAttribute("download", fileName); // Set the 'download' attribute for the filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link); // Clean up
      }
    } catch (error) {
      console.error("Error downloading PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/contract/getContracts", {
          method: "GET",
        });
      } catch (err) {
        console.error(err);
      }
    }
    getData();
  }, []);
  return (
    <div>
      <button
        onClick={() => downloadPdf("CONTRACT-1725567123402")}
        disabled={loading}
      >
        {loading ? "Downloading..." : "Download PDF"}
      </button>
    </div>
  );
};

export default Contracts;
