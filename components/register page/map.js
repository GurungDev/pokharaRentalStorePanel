"use client";
 
import React, { useState } from "react";
import { MapContainer,  Marker,  Popup, TileLayer, useMapEvents } from "react-leaflet";

const Map = () => {
  function LocationMarker() {
    const [position, setPosition] = useState(null)
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound(e) {
        setPosition(e.latlng)
        map.flyTo(e.latlng, map.getZoom())
      },
    })
  
    return position === null ? null : (
      <Marker position={position}  icon={icon}>
        <Popup>You are here</Popup>
      </Marker>
    )
  }
  const icon = L.icon({ iconUrl: "/marker-icon.png" });
  return (
    <div className="h-[40vh]">
      <MapContainer className="h-[40vh]" center={[28.2096,83.9856]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      
        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
