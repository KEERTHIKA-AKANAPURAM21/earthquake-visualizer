import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function EarthquakeMap({ earthquakes }) {
  const [loading, setLoading] = useState(true);
  const [center, setCenter] = useState([20, 0]);

  useEffect(() => {
    if (earthquakes.length > 0) {
      const latitudes = earthquakes.map((eq) => eq.geometry.coordinates[1]);
      const longitudes = earthquakes.map((eq) => eq.geometry.coordinates[0]);
      const avgLat = latitudes.reduce((a, b) => a + b, 0) / latitudes.length;
      const avgLon = longitudes.reduce((a, b) => a + b, 0) / longitudes.length;
      setCenter([avgLat, avgLon]);
    }
    setLoading(false);
  }, [earthquakes]);

  if (loading) return <div>Loading...</div>;

  return (
    <MapContainer
      center={center}
      zoom={2}
      style={{ height: "90vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {earthquakes.map((eq, index) => {
        const [long, lat, depth] = eq.geometry.coordinates;
        const { mag, place, time } = eq.properties;

        return (
          <Marker key={index} position={[lat, long]}>
            <Popup>
              <div>
                <h3>{place}</h3>
                <p>
                  <strong>Magnitude:</strong> {mag}
                </p>
                <p>
                  <strong>Depth:</strong> {depth} km
                </p>
                <p>
                  <strong>Time:</strong> {new Date(time).toLocaleString()}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
