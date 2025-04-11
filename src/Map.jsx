import React from "react";
import { Box } from "@mui/material";
import { MapContainer, TileLayer, Popup, Marker, LayersControl, LayerGroup, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import L from "leaflet";

import allRooms from "./rooms.js";
import SelectedRoomsContext from "./SelectedRoomContext.jsx";

function RenderRoutes() {
	const map = useMap();
	const { selectedRooms } = React.useContext(SelectedRoomsContext);
	const coords = Array.from(selectedRooms).map((room) => [room.lat, room.lon]);

	React.useEffect(() => {
		if (coords.length < 2) return;
		const routingControl = L.Routing.control({
			createMarker: function () { return null; },
			waypoints: coords, fitSelectedRoutes: true,
		}).addTo(map);
		return () => map.removeControl(routingControl);
	}, [coords, map]);

	return null;
}


export default function UBCMap() {
	const { selectedRooms } = React.useContext(SelectedRoomsContext);

	const buildings = new Map();
	for (const room of allRooms) {
		buildings.set(room.shortname, room);
	}

	const defaultIcon = new L.Icon({
		iconUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/156px-Map_marker.svg.png",
		iconSize: [25, 36],
		iconAnchor: [12, 41],
		popupAnchor: [1, -42]
	});

	function selectedIcon(building, number) {
		return new L.DivIcon({
			className: 'my-div-icon',
			html: `
				<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
					<circle cx="24" cy="24" r="24" fill="#002145" />
					<text x="50%" y="35%" text-anchor="middle" dy=".3em" fill="white" font-size="12" font-weight="bold">
						${building}
					</text>

					<text x="50%" y="75%" text-anchor="middle" dy=".3em" fill="white" font-size="12" font-weight="bold">
						${number}
					</text>
				</svg>
			`,
			
			iconAnchor: [24, 48],
			popupAnchor: [1, -36]
		});
	}

	return (
		<Box p={1} height="80vh">
			<MapContainer center={[49.2606, -123.246]} zoom={14} style={{ height: "100%", width: "100%" }}>
				<LayersControl position="topright">
					<LayersControl.Overlay name="Show all buildings">
						<LayerGroup>
							{Array.from(buildings.values()).map((room, index) => (
								<Marker key={index} position={[room.lat, room.lon]} icon={defaultIcon}>
									<Popup>{room.fullname}</Popup>
								</Marker>
							))}
						</LayerGroup>
					</LayersControl.Overlay>
				</LayersControl>

				<TileLayer
					key="tileLayer"
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				/>

				<RenderRoutes />

				{Array.from(selectedRooms).map((room, index) => (
					<Marker key={index} position={[room.lat, room.lon]} icon={selectedIcon(room.shortname, room.number)}>
					</Marker>
				))}
			</MapContainer>
		</Box>
	);
}
