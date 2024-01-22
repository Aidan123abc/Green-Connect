'use client'

import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import "leaflet/dist/leaflet.css";

interface Event {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  description: String;
  location: String;
  timeToMeet: Date;
}

const LeafletMap: React.FC = () => {
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const defaultIcon = new L.Icon({});
  const [customIcon, setCustomIcon] = useState(defaultIcon);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data: Event[] = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Dynamically import Leaflet on the client side
    import("leaflet").then((L) => {
      // Define a custom icon
      const imageUrl = '/5888925dbc2fc2ef3a1860ad.png';
      const icon = new L.Icon({
        iconUrl: imageUrl,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });

      // Set the custom icon in the state
      setCustomIcon(icon);

      // Set Leaflet as loaded
      setLeafletLoaded(true);
    });
  }, []);

  const defaultTileLayerUrl = "https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png";
  const bostonCoordinates: [number, number] = [42.3601, -71.0589];

  return (
    <div className="map-container h-[95%] mt-4">
      {leafletLoaded && (
        <MapContainer
          center={bostonCoordinates}
          zoom={11}
          className="map"
          preferCanvas={true}
          style={{
            height: "100%",
            width: "100%",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        >
          <TileLayer
            url={defaultTileLayerUrl}
            attribution={
              "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors"
            }
          />

          {/* Map over the markers array and add Marker components with Popups */}
          {events.map((event, index) => (
            <Marker key={index} position={[event.latitude, event.longitude] as L.LatLngTuple} icon={customIcon}>
              <Popup>
                <div>
                  <img
                    className="w-full h-40 object-cover object-center"
                    src="/default_image.png"
                    alt="Event Image"
                  />
                  <Link href={`/event?id=${event.id}`} className="text-2xl font-medium">{event.title}</Link>
                  <p>{event.description}</p>
                  <p>{event.location}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
};

export default LeafletMap;
