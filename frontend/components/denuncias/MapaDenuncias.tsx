"use client";

import {memo} from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const iconRetinaUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png";
const iconUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png";
const shadowUrl =
  "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});


function ClickableMap({ lat, lng, setLat, setLng }: any) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    },
  });

  return lat && lng ? <Marker position={[lat, lng]} /> : null;
}

function MapaDenuncia({
  lat,
  lng,
  setLat,
  setLng,
  readOnly = false,
}: any) {
  return (
    <MapContainer
      center={[-9.19, -75.0152]}
      zoom={5}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {lat && lng && <Marker position={[lat, lng]} />}

      {!readOnly && (
        <ClickableMap lat={lat} lng={lng} setLat={setLat} setLng={setLng} />
      )}
    </MapContainer>
  );
}

export default memo(MapaDenuncia);