"use client"; // ⚠️ must be client component
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

interface CheckoutMapProps {
  center: LatLngExpression;
}

export const CheckoutMap = ({ center }: CheckoutMapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>Your Delivery Location</Popup>
      </Marker>
    </MapContainer>
  );
};
