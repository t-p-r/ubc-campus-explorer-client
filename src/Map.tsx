import { useContext, useEffect } from "react";
import { Box } from "@mui/material";
import { MapContainer, TileLayer, Marker, LayersControl, LayerGroup, useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import L from "leaflet";

import allRooms from "./rooms.js";
import { SelectedRoomsContext } from "./SelectedRoomsContext";

function RenderRoutes() {
	const map = useMap();
	const { selectedRooms } = useContext(SelectedRoomsContext);
	const coords = Array.from(selectedRooms).map((room) => [room.lat, room.lon]);

	useEffect(() => {
		if (coords.length < 2) return;
		const routingControl = L.Routing.control({
			createMarker: function () { return null; },
			waypoints: coords,
			router: L.Routing.osrmv1({
				serviceUrl: 'https://routing.openstreetmap.de/routed-foot/route/v1', // i mean who uses a car to drive around campus lol
			}),
			fitSelectedRoutes: 'smart',
		}).addTo(map);
		return () => map.removeControl(routingControl);
	}, [coords, map]);

	return null;
}

function defaultIcon(building) {
	return new L.DivIcon({
		className: 'my-div-icon',
		html: `
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
					<circle cx="24" cy="24" r="24" fill="#002145" />
					<text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="14" font-weight="bold">
						${building}
					</text>
				</svg>
			`,

		iconAnchor: [18, 36],
		popupAnchor: [1, -30]
	});
}

function selectedIcon(building, number) {
	return new L.DivIcon({
		className: 'my-div-icon',
		html: `
				<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 48 48">
					<circle cx="24" cy="24" r="24" fill="#002145" />
					<text x="50%" y="35%" text-anchor="middle" dy=".3em" fill="white" font-size="14" font-weight="bold">
						${building}
					</text>
					<text x="50%" y="75%" text-anchor="middle" dy=".3em" fill="white" font-size="14" font-weight="bold">
						${number}
					</text>
				</svg>
			`,

		iconAnchor: [18, 36],
		popupAnchor: [1, -30]
	});
}

export default function UBCMap() {
	const { selectedRooms } = useContext(SelectedRoomsContext);

	const buildings = new Map();
	for (const room of allRooms) {
		buildings.set(room.shortname, room);
	}

	return (
		<Box p={1} height={"94.25vh"} display="flex" flexDirection="column">
			<MapContainer center={[49.2606, -123.246]} zoom={14} style={{ height: "100%", width: "100%" }}>
				<LayersControl position="topright">
					<LayersControl.Overlay name="Show all buildings">
						<LayerGroup>
							{Array.from(buildings.values()).map((room, index) => (
								<Marker key={index} position={[room.lat, room.lon]} icon={defaultIcon(room.shortname)}></Marker>
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
					<Marker key={index} position={[room.lat, room.lon]} icon={selectedIcon(room.shortname, room.number)}></Marker>
				))}
			</MapContainer>
		</Box>
	);
}
