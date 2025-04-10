import SelectedRoomsContext from "./SelectedRoomContext.jsx";
import React, { useContext, useEffect, useState } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { BorderAll } from "@mui/icons-material";

// This is for estimating the rough walking distance between selected rooms
// Using Leaflet's Open Source Routing Machine API

const MIN_WALKING_TIME = 3; // minutes

function MapComponent() {
	const { selectedRooms } = useContext(SelectedRoomsContext);

	const [distances, setDistances] = useState([]);

	// Courtesy of https://stackoverflow.com/questions/1502590/how-to-calculate-distance-between-two-gps-coordinates
	const distance = (lat1, lon1, lat2, lon2) => {
		const toRadians = (degrees) => (degrees * Math.PI) / 180;

		const earthRadius = 6371000; // Earth's radius in meters

		const dLat = toRadians(lat2 - lat1);
		const dLon = toRadians(lon2 - lon1);

		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return earthRadius * c; // Distance in meters
	};

	useEffect(() => {
		const calculateAllDistances = () => {
			let currDistances = [];
			for (let i = 0; i < selectedRooms.length; i++)
				for (let j = i + 1; j < selectedRooms.length; j++) {
					const room1 = selectedRooms[i];
					const room2 = selectedRooms[j];

					try {
						const meters = distance(room1.lat, room1.lon, room2.lat, room2.lon);
						// Converting using average walking speed of 80m / minute
						const metersPerMinute = 80;
						let minutes = Math.max(Math.round(meters / metersPerMinute), MIN_WALKING_TIME);

						currDistances.push({
							from: `${room1.shortname} ${room1.number}`,
							to: `${room2.shortname} ${room2.number}`,
							time: minutes,
						});
					} catch (error) {
						console.error("Failed calculating distance:", error);
					}
				}
			setDistances(currDistances);
		};

		calculateAllDistances();
	}, [selectedRooms]); // rerun when selectedRooms changes

	return distances.length ? (
		<div>
			<Typography variant="h5" gutterBottom mt={-1.5}>
				WALKING DISTANCES:
			</Typography>
			<TableContainer component={Paper} sx={{ border: 3, borderRadius: 3, overflow: "hidden" }}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Start Room</TableCell>
							<TableCell>End Room</TableCell>
							<TableCell>Estimated Walking Time (min)</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{distances.map((d, index) => (
							<TableRow key={index}>
								<TableCell>{d.from}</TableCell>
								<TableCell>{d.to}</TableCell>
								<TableCell>{d.time}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	) : null;
}

export default MapComponent;
