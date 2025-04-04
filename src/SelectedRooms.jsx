import React from "react";
import { Box, Typography } from "@mui/material";
import SelectedRoomsContext from "./SelectedRoomContext";
import RoomInfoBox from "./RoomInfoBox";

export default function SelectedRooms() {
	const { selectedRooms, addSelectedRoom } = React.useContext(SelectedRoomsContext);

	const calculateDistance = (lat1, lon1, lat2, lon2) => {
		return new Promise((resolve, reject) => {
			const url1 = "https://router.project-osrm.org/route/v1/walking/";
			const url2 = "?overview=false&alternatives=true&steps=true";
			const url = `${url1}${lon1},${lat1};${lon2},${lat2}${url2}`;

			// fetch directly using the OSRM public API
			fetch(url)
				.then((response) => response.json())
				.then((data) => {
					if (data.routes && data.routes[0]) {
						const distanceInMeters = data.routes[0].legs[0].distance;
						resolve(distanceInMeters);
					} else {
						reject("No route found");
					}
				})
				.catch((error) => {
					console.error("Error calculating route:", error);
					reject("Error calculating route");
				});
		});
	};

	return (
		<Box>
			<Typography variant="h5" gutterBottom mt={-1.5}>
				SELECTED ROOMS:
			</Typography>
			<Box display="flex" flexDirection="row" gap={1}>
				{selectedRooms.map((room) => (
					<RoomInfoBox key={room.shortname + room.number} room={room} selectedMode={true} />
				))}
			</Box>
		</Box>
	);
}
