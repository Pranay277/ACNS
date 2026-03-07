/**
 * components/MapView.js
 * ---------------------------------------------------------------
 * Mapbox GL JS wrapper.
 *
 * Props:
 *   route    – GeoJSON LineString (or null) to display on the map
 *   markers  – array of { lng, lat, title, type } for issue markers
 *   center   – [lng, lat]  default centre of the map
 *   zoom     – default zoom level
 *
 * The component only RENDERS – it never calculates routes or fetches
 * data on its own.
 * ---------------------------------------------------------------
 */

import React, { useEffect, useRef, useState, Component } from 'react';

let mapboxgl;
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN || '';
try {
  mapboxgl = require('mapbox-gl');
  mapboxgl.accessToken = MAPBOX_TOKEN;
} catch (err) {
  console.warn('mapbox-gl failed to load:', err);
  mapboxgl = null;
}

const ISSUE_COLORS = {
  'Broken Elevator':          '#ff5252',
  'Blocked Ramp':             '#ffab00',
  'Narrow Passage':           '#ff6d00',
  'Construction Obstruction': '#e040fb',
  'Damaged Pathway':          '#ff1744',
  default:                    '#00d4ff',
};

/* ----------------------------------------------------------------
   Error Boundary – prevents Mapbox crashes from blanking the page
   ---------------------------------------------------------------- */
class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="map-container d-flex align-items-center justify-content-center"
          style={{ background: 'var(--bg-card)', border: '1px dashed var(--accent)' }}>
          <div className="text-center p-4">
            <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🗺️</div>
            <p style={{ color: 'var(--danger)', fontWeight: 600 }}>Map failed to load.</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '.85rem' }}>
              Check the browser console for details.
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/* ----------------------------------------------------------------
   Map Component
   ---------------------------------------------------------------- */
const MapViewInner = ({
  route = null,
  markers = [],
  center = [-97.7431, 30.2672],
  zoom = 15,
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(false);

  /* --- Check for valid token AND that mapboxgl loaded --- */
  const hasToken = mapboxgl && MAPBOX_TOKEN && MAPBOX_TOKEN !== 'YOUR_MAPBOX_ACCESS_TOKEN';

  /* --- Initialise map --- */
  useEffect(() => {
    if (!hasToken) return;           // skip if no valid token or mapboxgl missing
    if (mapRef.current) return;      // already initialised

    try {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center,
        zoom,
      });

      map.addControl(new mapboxgl.NavigationControl(), 'top-right');

      map.on('error', () => setMapError(true));

      map.on('load', () => {
        // route source (empty at first)
        map.addSource('route', {
          type: 'geojson',
          data: { type: 'FeatureCollection', features: [] },
        });

        map.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          layout: { 'line-join': 'round', 'line-cap': 'round' },
          paint: {
            'line-color': '#00d4ff',
            'line-width': 5,
            'line-opacity': 0.85,
          },
        });
      });

      mapRef.current = map;

      return () => map.remove();
    } catch (err) {
      console.error('Mapbox init error:', err);
      setMapError(true);
    }
  }, [hasToken, center, zoom]);

  /* --- Update route layer when prop changes --- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;

    const src = map.getSource('route');
    if (!src) return;

    if (route) {
      src.setData({
        type: 'Feature',
        geometry: route,
      });
    } else {
      src.setData({ type: 'FeatureCollection', features: [] });
    }
  }, [route]);

  /* --- Render issue markers --- */
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old markers
    document.querySelectorAll('.acns-marker').forEach((el) => el.remove());

    markers.forEach((m) => {
      const el = document.createElement('div');
      el.className = 'acns-marker';
      el.style.cssText = `
        width:16px; height:16px;
        border-radius:50%;
        background:${ISSUE_COLORS[m.type] || ISSUE_COLORS.default};
        border:2px solid #fff;
        cursor:pointer;
        box-shadow:0 0 8px ${ISSUE_COLORS[m.type] || ISSUE_COLORS.default};
      `;

      new mapboxgl.Marker(el)
        .setLngLat([m.lng, m.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 12 }).setHTML(
            `<strong style="color:#1a1a2e">${m.title || 'Issue'}</strong>
             <br/><span style="color:#555">${m.type || ''}</span>`
          )
        )
        .addTo(map);
    });
  }, [markers]);

  /* --- Fallback: no token or map error --- */
  if (!hasToken || mapError) {
    return (
      <div
        className="map-container d-flex align-items-center justify-content-center"
        style={{ background: 'var(--bg-card)', border: '1px dashed var(--accent)' }}
      >
        <div className="text-center p-4">
          <div style={{ fontSize: '2.5rem', marginBottom: 8 }}>🗺️</div>
          <h5 style={{ color: 'var(--accent)', fontWeight: 700 }}>Campus Map</h5>
          <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', maxWidth: 380, margin: '0 auto' }}>
            {!hasToken
              ? 'Set REACT_APP_MAPBOX_TOKEN in your .env file to enable the interactive map.'
              : 'Map encountered an error. Check the browser console.'}
          </p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className="map-container" />;
};

/* ----------------------------------------------------------------
   Export wrapped with error boundary
   ---------------------------------------------------------------- */
const MapView = (props) => (
  <MapErrorBoundary>
    <MapViewInner {...props} />
  </MapErrorBoundary>
);

export default MapView;

