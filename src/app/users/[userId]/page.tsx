"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserDetailPage = () => {
  const { userId } = useParams(); // Extract userId from the URL

  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        console.log(data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Address:</strong> {userData.address}
      </p>
      <p>
        <strong>Category:</strong>
        {userData.category && userData.category.join(", ")}
      </p>
      <p>
        <strong>Description:</strong> {userData.description}
      </p>
      <p>
        <strong>Starting Month:</strong> {userData.startingMonth}
      </p>
      <p>
        <strong>Ending Month:</strong> {userData.endingMonth}
      </p>
      <p>
        <strong>Location:</strong> {userData.location}
      </p>
      <p>
        <strong>Main ID:</strong> {userData.mainId}
      </p>
      <p>
        <strong>Minimum Quantity:</strong> {userData.minimumQuantity}
      </p>
      <p>
        <strong>Payment Terms:</strong> {userData.paymentTerms.join(", ")}
      </p>
    </div>
  );
};

export default UserDetailPage;
