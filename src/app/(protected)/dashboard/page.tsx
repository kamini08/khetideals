import { auth, signOut } from "../../../../auth";
// import { getAllCoordinates } from "../../../../data/user";
import "../components/buyer.css";
// import { useRouter } from "next/navigation";
// import FarmerDashboard from "../components/FarmerDashboard";
import dynamic from "next/dynamic";
// import FarmerProfile from "../farmerManageProfile/page";
import Link from "next/link";
import FarmerDashboard from "../components/FarmerDashboard";

const SettingsPage = async () => {
  const session = await auth();

  const user = session?.user.role.toLocaleLowerCase();
  // const coordinates = await getAllCoordinates();
  // console.log(
  //   coordinates.map((coord) => {
  //     console.log(coord.latitude);
  //     console.log(coord.longitude);
  //   })
  // );
  // const user = "farmer";

  const MapWithNoSSR = dynamic(() => import("../components/MapComponent"), {
    ssr: false,
  });
  const MapWithNoSSRBuyer = dynamic(
    () => import("../components/MapComponentBuyer"),
    {
      ssr: false,
    }
  );

  // TODO form validation

  // const router = useRouter();
  return (
    <div>
      {JSON.stringify(session?.user)}

      <form
        action={async () => {
          "use server";

          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>

      {user === "farmer" ? (
        <div className="container">
          <div className="sidebar">
            <h2 className="farmer-profile">Farmer Profile</h2>
            {/* <FarmerDashboard onSectionClick={handleSidebarClick} /> */}
            <Link href="/farmerProfile">
              <div
                className="dashboard-box"
                // onClick={() => onSectionClick("profile-section")}
              >
                <h3>Manage Profile</h3>
                <p>Update your profile and farming details.</p>
              </div>
            </Link>
            <div
              className="dashboard-box"
              // onClick={() => router.push("/farmerManageProfile")}
            >
              <h3>Current Contracts</h3>
              <p>View and manage your current contracts.</p>
            </div>
            <div
              className="dashboard-box"
              // onClick={() => onSectionClick("search-section")}
            >
              <h3>Search Potential Buyers</h3>
              <p>Explore new farming opportunities and buyers.</p>
            </div>

            <div className="dashboard-box">
              <h3>Transaction History</h3>
              <p>Review your past transactions and earnings.</p>
            </div>
          </div>
          <div className="main-content">
            {/* <FarmerDashboard /> */}

            {/* <div className="section buyer-list text-black">
              <h3>Buyer List</h3>
              <ul id="buyerList"></ul>
            </div> */}

            <div className="section placeholder-container">
              {/* Placeholder for map or other content */}
              <div className="flex flex-row w-full">
                {/* Map component */}
                <MapWithNoSSR />
              </div>
            </div>

            <div className="section" id="contracts-section">
              <h2>Current Contracts</h2>
              {/* <div className="contracts-container">
                {contracts.map((contract, index) => (
                  <div className="contract-card" key={index}>
                    <h3>Buyer: {contract.buyerName}</h3>
                    <p>Crop Type: {contract.cropType}</p>
                    <p>Quantity: {contract.quantity} kg</p>
                  </div>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="sidebar">
            <h2 className="farmer-profile">Buyer Profile</h2>
            {/* <BuyerDashboard /> */}
            <div className="farmer-dashboard">
              <Link href="/buyerManageProfile">
                <div className="dashboard-box">
                  <h3>Manage Profile</h3>
                  <p>Setup your profile and farming details.</p>
                </div>
              </Link>
              <Link href="/buyerProfile">
                <div className="dashboard-box">
                  <h3>My Profile</h3>
                  <p>Update your profile and farming details.</p>
                </div>
              </Link>
              {/* <div className="dashboard-box">
        <h3>Signed Contracts</h3>
        <p>View and manage your signed contracts.</p>
      </div> */}
              <div className="dashboard-box">
                <h3>Available Farmers </h3>
                <p>Browse and contact available farmeres.</p>
              </div>
              <div className="dashboard-box">
                <h3>Make a Payment</h3>
                <p>Initiate and process payments securely.</p>
              </div>
            </div>
          </div>

          {/* Farmer Dashboard and Search Section */}
          <div className="dashboard-content">
            <div className="farmer-finder">
              {/* <h1 className="search-profile">Search Potential Farmers</h1>
              <div className="form-group text-black">
                <label htmlFor="cropType">Crop Type</label>
                <select id="cropType" className="select2">
                  <option value="wheat">Wheat</option>
                  <option value="rice">Rice</option>
                  <option value="barley">Barley</option>
                  <option value="corn">Corn</option>
                </select>
              </div> */}

              {/* <div className="form-group text-black">
                <label htmlFor="quality">Quality</label>
                <select id="quality">
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </select>
              </div> */}

              {/* <div className="form-group text-black">
                <label htmlFor="farmerLocation">Location</label>
                <input type="text" id="farmerLocation" />
              </div>
              <div className="form-group text-black">
                <label htmlFor="minQuantity">Minimum Quantity</label>
                <input type="number" id="minQuantity" />
              </div>
              <button
                id="searchBtn"
                // onClick={searchFarmers}
              >
                Search
              </button> */}

              <div className="farmer-list">
                <h3>Farmers List</h3>
                <ul id="farmerList">
                  {/* Farmers will be dynamically inserted here */}
                </ul>
              </div>

              {/* Replace map with a simple div */}
              <MapWithNoSSRBuyer />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
