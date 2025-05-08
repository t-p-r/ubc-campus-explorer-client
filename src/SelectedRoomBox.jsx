import React from "react";
import { Typography, Box } from "@mui/material";
import useSelectedRooms, { SelectedRoomsContext } from "./SelectedRoomsContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

export default function SelectedRoomBox({ room, width, index }) {
	if (!room) {
		return null;
	}

	const { selectedRooms, setSelectedRooms } = useSelectedRooms();

	return (
		<Box
			data-testid="selected-room-box"
			index={index}
			borderColor="black"
			borderRadius={3}
			border={3}
			p={1}
			display="flex"
			flexDirection="column"
			flexWrap="wrap"
			bgcolor="white"
			width={width}
			mb={2}
			gap={2} // Added gap for spacing
		>
			<Box display="flex" alignItems="top">
				<Typography data-testid="selected-room-name" variant="h6">
					<strong>{room.name}</strong>
				</Typography>
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center" mt={-2}>
				<IconButton
					data-testid="selected-room-delete-button"
					onClick={() => setSelectedRooms(selectedRooms.filter((r) => r !== room))}
					variant="text"
					color="secondary"
				>
					<DeleteOutlineIcon />
				</IconButton>
			</Box>
		</Box>
	);
}
