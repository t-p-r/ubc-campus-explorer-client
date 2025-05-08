import React from "react";
import { Box, Typography } from "@mui/material";
import useSelectedRooms, { SelectedRoomsContext } from "./SelectedRoomsContext";
import SelectedRoomBox from "./SelectedRoomBox";

export default function SelectedRooms() {
	const { selectedRooms } = useSelectedRooms();

	return selectedRooms.length > 0 && (
		<Box>
			<Typography variant="h5" gutterBottom mt={-0.5} width={"100%"} textAlign="center">
				SELECTED ROOMS:
			</Typography>
			<Box display="flex" flexDirection="row" gap={1} flexWrap="wrap" justifyContent="center">
				{selectedRooms.map((room, index) => (
					<SelectedRoomBox key={room.shortname + room.number} room={room} index={index} />
				))}
			</Box>
		</Box>
	);
}
