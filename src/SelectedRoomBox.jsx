import React from "react";
import { Typography, Box } from "@mui/material";
import SelectedRoomsContext from "./SelectedRoomContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

function SelectedRoomBox({ room, width }) {
	if (!room) {
		return null;
	}

	const { selectedRooms, setSelectedRooms } = React.useContext(SelectedRoomsContext);

	return (
		<Box
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
				<Typography variant="h6">
					<strong>
						{room.shortname} {room.number}
					</strong>
				</Typography>
			</Box>

			<Box display="flex" justifyContent="center" alignItems="center" mt={-2}>
				<IconButton
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

export default SelectedRoomBox;
