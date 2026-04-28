import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './StrikerMap.css';

const venues = [
  { name: 'Josef Sportzentrum',                  district: 'Industriequartier', lat: 47.3875464, lng: 8.5210255 },
  { name: 'Schule im Herrlig (Indoor / Futsal)',  district: 'Altstetten',        lat: 47.3898331, lng: 8.4817827 },
  { name: 'Schulhaus Untermoos',                 district: 'Altstetten',        lat: 47.380564,  lng: 8.4822982 },
  { name: 'Zurich City Rebhügel',                district: 'Wiedikon',          lat: 47.3652785, lng: 8.5168649 },
  { name: 'Turnhalle Schwammedingen',            district: 'Schwammedingen',    lat: 47.4086241, lng: 8.5734008 },
  { name: 'Zurich City Hallenbad',               district: 'Aussersihl',        lat: 47.3720874, lng: 8.5328679 },
  { name: 'Zurich Sihlfriedhof',                 district: 'Sihlfeld',          lat: 47.3698885, lng: 8.5163481 },
  { name: '7 vs 7 — Allmend Brunau',             district: 'Leimbach',          lat: 47.3539172, lng: 8.5235334 },
  { name: 'Turnhalle Borrweg',                   district: 'Enge',              lat: 47.3599,    lng: 8.5044482 },
  { name: 'Sportanlage Hardhof',                 district: 'Höngg',             lat: 47.3965645, lng: 8.4975946 },
  { name: 'Manegg',                              district: 'Leimbach',          lat: 47.3481354, lng: 8.5264307 },
];

const StrikerMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [47.378, 8.52],
      zoom: 12,
      zoomControl: true,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    }).addTo(map);

    const icon = L.divIcon({
      className: '',
      html: '<div class="striker-map-pin">⚽</div>',
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -34],
    });

    venues.forEach(v => {
      L.marker([v.lat, v.lng], { icon })
        .bindPopup(
          `<div class="striker-map-popup-inner"><strong>${v.name}</strong><br/><span>${v.district}</span></div>`,
          { className: 'striker-map-popup', closeButton: true }
        )
        .addTo(map);
    });

    return () => {
      map.remove();
    };
  }, []);

  return (
    <div className="striker-map-wrapper">
      <div className="striker-map-header">
        <span className="striker-map-label">⚽ Pitches in Zurich</span>
        <span className="striker-map-count">{venues.length} venues</span>
      </div>
      <div ref={mapRef} className="striker-map" />
    </div>
  );
};

export default StrikerMap;
