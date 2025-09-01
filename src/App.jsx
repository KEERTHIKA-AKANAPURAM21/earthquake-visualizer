import React, { useState, useEffect } from "react";
import EarthquakeMap from "./components/EarthquakeMap";

const USGS_URL =
  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

export default function App() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [minMag, setMinMag] = useState(0);
  const [autoRefresh, setAutoRefresh] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(USGS_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setEarthquakes(data.features);
    } catch (err) {
      console.error(err);
      setEarthquakes([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let timer;
    if (autoRefresh) {
      timer = setInterval(fetchData, 5 * 60 * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [autoRefresh]);

  const filteredQuakes = earthquakes.filter(
    (eq) => eq.properties.mag >= minMag
  );

  return (
    <div className="app">
      <div className="header">
        <h1>Earthquake Visualizer</h1>
        <p>Shows recent earthquakes from USGS on an interactive map.</p>
      </div>

      <div className="card controls">
        <label>
          Min magnitude: <strong>{minMag}</strong>
        </label>
        <input
          type="range"
          min="0"
          max="8"
          step="0.1"
          value={minMag}
          onChange={(e) => setMinMag(Number(e.target.value))}
        />

        <label style={{ marginLeft: 12 }}>
          <input
            type="checkbox"
            checked={autoRefresh}
            onChange={(e) => setAutoRefresh(e.target.checked)}
          />{" "}
          Auto-refresh (every 5 min)
        </label>
      </div>

      <div className="card map-wrapper">
        <EarthquakeMap earthquakes={filteredQuakes} />
      </div>

      <div style={{ maxWidth: 1000, width: "100%" }}>
        <p style={{ color: "#666", fontSize: 14 }}>
          Data source: USGS Earthquake API — all earthquakes in the past day.
        </p>
      </div>
    </div>
  );
}
