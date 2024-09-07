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
    const fetchCoordinates = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching coordinates:", error);
        return [];
      }
    };

    const onLocationFound = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);

      if (!mapRef.current) {
        const map = L.map("map").setView([latitude, longitude], 13);
        mapRef.current = map;

        // Add tile layer
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© Kethideal contributors",
        }).addTo(map);

        // Fetch and add markers for locations from the database
        const coordinates = await fetchCoordinates();
        coordinates.forEach(
          (coord: { latitude: string; longitude: string }) => {
            L.marker([parseFloat(coord.latitude), parseFloat(coord.longitude)])
              .addTo(map)
              // .bindPopup("")
              .openPopup();
          }
        );

        // Add marker for the user's current location
        L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup("i am here")
          .openPopup();
        L.circle([latitude, longitude], {
          color: "blue",
          fillColor: "#30f",
          fillOpacity: 0.4,
          radius: 5000,
        }).addTo(map);

        // Update map view on marker click
        map.on("click", (event: L.LeafletMouseEvent) => {
          const latLng = event.latlng;
          map.flyTo(latLng, 13);
        });
      } else {
        // Update map view if already initialized
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
        mapRef.current.remove();
        mapRef.current = null;
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
        {!position && <p className="font-extrabold">Loading map...</p>}
      </div>
    </>
  );
};

export default MapComponent;
