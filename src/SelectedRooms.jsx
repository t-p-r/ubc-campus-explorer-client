import React from "react";
import { Box, Typography } from "@mui/material";
import SelectedRoomsContext from "./SelectedRoomContext";
import RoomInfoBox from "./RoomInfoBox";

export default function SelectedRooms() {
	const { selectedRooms } = React.useContext(SelectedRoomsContext);
	const [distances, setDistances] = React.useState([]);

	// Courtesy of https://stackoverflow.com/questions/1502590/how-to-calculate-distance-between-two-gps-coordinates
	// const distance = (lat1, lon1, lat2, lon2) => {
	// 	const toRadians = (degrees) => (degrees * Math.PI) / 180;

	// 	const earthRadius = 6371000; // Earth's radius in meters

	// 	const dLat = toRadians(lat2 - lat1);
	// 	const dLon = toRadians(lon2 - lon1);

	// 	const a =
	// 		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
	// 		Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

	// 	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

	// 	return earthRadius * c; // Distance in meters
	// };

	// React.useEffect(() => {
	// 	const calculateAllDistances = async () => {
	// 		let currDistances = [];
	// 		for (let i = 0; i + 1 < selectedRooms.length; i++) {
	// 			const room1 = selectedRooms[i];
	// 			const room2 = selectedRooms[i + 1];

	// 			const meters = distance(room1.lat, room1.lon, room2.lat, room2.lon);
	// 			// Converting using average walking speed of 80m / minute
	// 			const metersPerMinute = 80;
	// 			let minutes = Math.round(meters / metersPerMinute);

	// 			if (minutes === 0) {
	// 				minutes = 4; // shortcut... rough estimate for same building distance
	// 			}

	// 			currDistances.push({
	// 				room1,
	// 				room2,
	// 				time: minutes,
	// 			});
	// 		}
	// 		setDistances(currDistances);
	// 	};

	// 	calculateAllDistances();
	// }, [selectedRooms]); // rerun when selectedRooms changes

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
