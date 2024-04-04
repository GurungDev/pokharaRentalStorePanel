import React, { useContext, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { MapContext } from "./registerContext";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/images/marker-icon-2x.png",
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
});

const LocateUserButton = () => {
  const map = useMap();

  const locateUser = () => {
    map.locate();
  };

  return (
    <button
      onClick={locateUser}
      className="  z-[999] right-0 bg-secondary text-white p-2 m-3 rounded-xl bg-opacity-[70%] hover:bg-opacity-[100%] duration-300 absolute"
      type="button"
    >
      Locate me
    </button>
  );
};

const Map = ({}) => {
  const { setLtd, setLong } = useContext(MapContext);
  const [position, setPosition] = useState(null);

  const LocationMarker = () => {
    const map = useMapEvents({
      locationfound(e) {
        const newPosition = e.latlng;
        setLong(newPosition.lng);
        setLtd(newPosition.lat);
        setPosition(newPosition);
        map.flyTo(newPosition, map.getZoom());
      },
      click(e) {
        const newPosition = e.latlng;
        setLong(newPosition.lng);
        setLtd(newPosition.lat);
        setPosition(newPosition);
       
        map.flyTo(newPosition, map.getZoom());
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  };

  return (
    <div className="h-[40vh]">
      <h2>Location</h2>
      <MapContainer
        className="h-[40vh]"
        center={[28.2096, 83.9856]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <LocateUserButton />
        <TileLayer
          attribution=""
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker />
      </MapContainer>
    </div>
  );
};

export default Map;
