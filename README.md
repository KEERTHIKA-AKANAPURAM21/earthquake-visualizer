# Earthquake Visualizer

This web app shows recent earthquakes from the USGS API on an interactive map.
You can filter earthquakes by minimum magnitude and optionally enable auto-refresh.

**Tech Stack:** React JS, Leaflet, OpenStreetMap tiles  
**Data Source:** USGS Earthquake API (all earthquakes in past 24 hours)

**Features Implemented:**
- Interactive world map with earthquake markers
- Popup shows magnitude, depth, location, and time
- Filter earthquakes by minimum magnitude
- Optional auto-refresh every 5 minutes

**Approach:**
- Used React JS with functional components and hooks
- Used react-leaflet for map rendering
- Fetched data from USGS API and passed as props to the map
- Calculated dynamic map center based on earthquake coordinates

