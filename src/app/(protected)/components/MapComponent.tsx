"use client";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src,
  iconUrl: iconUrl.src,
  shadowUrl: shadowUrl.src,
});
const MapComponent: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const onLocationFound = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);

      // Initialize the map only if it hasn't been initialized yet
      if (!mapRef.current) {
        const map = L.map("map").setView([latitude, longitude], 13);
        mapRef.current = map;

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© Kethideal contributors",
        }).addTo(map);

        // markers for the location from database
        L.marker([12.925007, 77.586627])
          .addTo(map)
          .bindPopup("RICE")
          .openPopup();
        L.marker([12.90281, 77.533475])
          .setOpacity(1)
          .addTo(map)
          .bindPopup("SMTG")
          .openPopup();
        L.marker([12.874865, 77.573279])
          .addTo(map)
          .bindPopup("IDK")
          .openPopup();
        L.marker([12.843871, 77.495581])
          .addTo(map)
          .bindPopup("CORN")
          .openPopup();

        L.marker([12.954375, 77.535432])

          .addTo(map)
          .bindPopup("CORN")
          .openPopup();

        // Add marker for current location
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("You are here!")
          .openPopup();
        // Optionally add a circle to show accuracy
        L.circle([latitude, longitude], {
          color: "blue",
          fillColor: "#30f",
          fillOpacity: 0.4,
          radius: 5000,
        }).addTo(map);

        // Add event listener to update the map view when the user clicks on a marker
        map.on("click", (event: L.LeafletMouseEvent) => {
          const latLng = event.latlng;
          console.log(latLng);
          map.flyTo(latLng, 13);
        });
      } else {
        // If the map is already initialized, just set the view to the new location
        mapRef.current.setView([latitude, longitude], 13);
      }
    };

    const onLocationError = (error: GeolocationPositionError) => {
      console.error(error);
      alert("Unable to retrieve your location.");
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        onLocationFound,
        onLocationError
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove(); // Clean up the map instance
        mapRef.current = null; // Reset the map reference
      }
    };
  }, []);

  return (
    <>
      {/* side bar */}

      {/* map */}
      <div
        id="map"
        style={{ height: "100vh", width: "100%" }}
        className="flex justify-center items-center"
      >
        {!position && <p className=" font-extrabold ">Loading map...</p>}
      </div>
    </>
  );
};

export default MapComponent;
