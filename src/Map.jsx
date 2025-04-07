import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import L from "leaflet";

import allRooms from "./rooms.jsx";
import SelectedRoomsContext from "./SelectedRoomContext.jsx";

export default function UBCMap() {
	const [showMarkers, setShowMarkers] = React.useState(false);
	const { selectedRooms } = React.useContext(SelectedRoomsContext);

	const buildings = new Map();
	for (const room of allRooms) {
		buildings.set(room.shortname, room);
	}

	const handleCheckboxChange = (e) => {
		setShowMarkers(e.target.checked);
	};

	const defaultIcon = new L.Icon({
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/156px-Map_marker.svg.png",
		iconSize: [25, 36],
		iconAnchor: [12, 41],
		popupAnchor: [1, -42]
	});

	const selectedIcon = new L.Icon({	
		iconUrl: "https://cdn.iconscout.com/icon/free/png-256/free-map-marker-icon-download-in-svg-png-gif-file-formats--location-pin-pointer-user-interface-pack-icons-2700108.png?f=webp&w=256",
		iconSize: [48,48],
		iconAnchor: [24, 48],
		popupAnchor: [1, -36]
	});

	return (
		<Box p={1}>
			<Box display="flex" alignItems="center">
				<Typography>show all {buildings.size} buildings as markers</Typography>
				<Checkbox checked={showMarkers} onChange={handleCheckboxChange} />
			</Box>
			<Box height="70vh">
				<MapContainer center={[49.2606, -123.246]} zoom={14} style={{ height: "100%", width: "100%" }}>
					<TileLayer
						key="tileLayer"
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					/>
					{showMarkers &&
						Array.from(buildings.values()).map((room, index) => (
							<Marker key={index} position={[room.lat, room.lon]} icon={defaultIcon}>
								<Popup>{room.fullname}</Popup>
							</Marker>
						))}

					{Array.from(selectedRooms).map((room, index) => (<Marker key={index} position={[room.lat, room.lon]} icon={selectedIcon}>
						<Popup>{room.fullname}</Popup>
					</Marker>))}
				</MapContainer>
			</Box>
		</Box>
	);
}
