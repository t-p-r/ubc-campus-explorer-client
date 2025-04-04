import React from "react";
import { Box, Typography, Checkbox } from "@mui/material";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import L from "leaflet";

export default function UBCMap({ rooms }) {
	const [showMarkers, setShowMarkers] = React.useState(false);
	
	const buildings = new Map();
	for (const room of rooms) {
		buildings.set(room.rooms_shortname, room);
	}

	const handleCheckboxChange = (e) => {
		setShowMarkers(e.target.checked);
	};

	const onlineIcon = new L.Icon({
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/156px-Map_marker.svg.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
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
							<Marker key={index} position={[room.rooms_lat, room.rooms_lon]} icon={onlineIcon}>
								<Popup>{room.rooms_fullname}</Popup>
							</Marker>
						))}
				</MapContainer>
			</Box>
		</Box>
	);
}
