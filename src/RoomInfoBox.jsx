import React from "react";
import { Typography, Button, Box } from "@mui/material";
import SelectedRoomsContext from "./SelectedRoomContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

function RoomInfoBox({ room, selectedMode, width }) {
	if (!room) {
		return null;
	}

	const { selectedRooms, addSelectedRoom, setSelectedRooms } = React.useContext(SelectedRoomsContext);

	return (
		<Box
			borderColor="black"
			borderRadius={4}
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
			<Box display="flex" alignItems="top">
				<Typography variant="h6">
					<strong>
						{room.shortname} {room.number}
					</strong>
				</Typography>
			</Box>

			{!selectedMode && (
				<Box mt={0.4} width="50%">
					<Typography>building: <em>{room.fullname}</em></Typography>
					<Typography>address: {room.address}</Typography>
					<Typography>capacity: {room.seats}</Typography>
					{/* <Typography>lat: {room.lat}</Typography>
				<Typography>lon: {room.lon}</Typography> */}
				</Box>
			)}

			<Box flexGrow={1} />

			{selectedMode ? (
				<Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
					<IconButton
						onClick={() => setSelectedRooms(selectedRooms.filter((r) => r !== room))}
						variant="text"
						color="secondary"
					>
						<DeleteOutlineIcon />
					</IconButton>
				</Box>
			) : (
				<Box display="flex" alignItems="center" justifyContent="center">
					<Button
						variant="contained"
						onClick={() => {
							addSelectedRoom(room);
						}}
					>
						Select
					</Button>
				</Box>
			)}
		</Box>
	);
}

export default RoomInfoBox;
