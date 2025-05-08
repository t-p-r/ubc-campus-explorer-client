import { useContext } from "react";
import { Typography, Button, Box } from "@mui/material";
import useSelectedRooms from "./SelectedRoomsContext";

export default function RoomInfoBox({ room, width, index }) {
	if (!room) {
		return null;
	}

	const { selectedRooms, setSelectedRooms, addSelectedRoom } = useSelectedRooms();

	return (
		<Box
			data-testid="room-info-box"
			index={index}
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
				<Typography data-testid="room-name" variant="h6">
					<strong>
						{room.name}
					</strong>
				</Typography>
			</Box>

			<Box mt={0.4} width="60%">
				<Typography data-testid="room-fullname">building: <em>{room.fullname}</em></Typography>
				<Typography data-testid="room-address">address: {room.address}</Typography>
				<Typography data-testid="room-capacity">capacity: {room.seats}</Typography>
			</Box>
			<Box flexGrow={1} />


			<Box display="flex" alignItems="center" justifyContent="right">
				<Button
					data-testid="select-room-button"
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
