import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../../../contexts/CitiesContext";
import ReactCountryFlag from "react-country-flag";
import { useGeolocation } from "../../../hooks/useGeolocation";
import Button from "../../ui/button/Button";
import { useUrlPosition } from "../../../hooks/useUrlPosition";

const Map = () => {
  const { cities } = useCities();

  const [mapPosition, setMapPosition] = useState([40, 0]);
  const [lat, lng] = useUrlPosition();

  const {
    isLoading: isLoadingGeolocation,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (!lat || !lng) return;
    setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (!geoLocationPosition) return;
    setMapPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingGeolocation ? "Loading..." : "Your position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        maxZoom={18}
        minZoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <ReactCountryFlag countryCode={city.emoji} svg /> {city.cityName}.
            </Popup>
            {/* <ZoomToMarker city={city} /> */}
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
};

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

// function ZoomToMarker({ city }) {
//   const map = useMap();
//   const zoomLevel = 2; // Define the zoom level you want when clicking on the popup
//   debugger;

//   const handlePopupOpen = () => {
//     map.setView(city.position, zoomLevel);
//   };

//   return (
//     <Popup onOpen={handlePopupOpen}>
//       <ReactCountryFlag countryCode={city.emoji} svg /> {city.cityName}.
//     </Popup>
//   );
// }

export default Map;
