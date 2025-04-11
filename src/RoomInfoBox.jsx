import React from "react";
import { Typography, Button, Box } from "@mui/material";
import SelectedRoomsContext from "./SelectedRoomContext";

function RoomInfoBox({ room, width }) {
	if (!room) {
		return null;
	}

	const { selectedRooms, addSelectedRoom, setSelectedRooms } = React.useContext(SelectedRoomsContext);

	return (
		<Box
			borderColor="black"
			borderRadius={3}
			border={3}
			p={1}
			display="flex"
			flexDirection="row"
			flexWrap="wrap"
			bgcolor="white"
			width={width}
			mb={2}
			gap={2} // Added gap for spacing
		>
			<Box display="flex" alignItems="top" width="20%">
				<Typography variant="h6">
					<strong>
						{room.shortname} {room.number}
					</strong>
				</Typography>
			</Box>

			<Box mt={0.4} width="60%">
				<Typography>building: <em>{room.fullname}</em></Typography>
				<Typography>address: {room.address}</Typography>
				<Typography>capacity: {room.seats}</Typography>
			</Box>
			<Box flexGrow={1} />


			<Box display="flex" alignItems="center" justifyContent="right">
				<Button
					variant="contained"
					onClick={() => {
						addSelectedRoom(room);
					}}
				>
					Select
				</Button>
			</Box>
		</Box>
	);
}

export default RoomInfoBox;
