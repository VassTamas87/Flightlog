import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Back from "./Back";

const Map = () => {
  const position = [48.1, 20.78333];

  return (
    <div className="m-3">
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "90vh", width: "100wh" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      <Back />
    </div>
  );
};

export default Map;
