import { Typography, TextField, Button, Box } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RoomInfoBox from "./RoomInfoBox";
import React, { useMemo, useState } from "react";

import allRooms from "./rooms.js";

const DISPLAY_LIMIT = 6;

const sortOptions = Object.freeze({
	BUILDING: ["fullname", false],
	SEATS_DEC: ["seats", true],
});

export default function SearchComponent() {
	const [displayFrom, setDisplayFrom] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState(sortOptions.SEATS_DEC);

	const changeDisplayButton = (text, func) => {
		return (
			<Button onClick={func} variant="text" color="primary">
				<Typography variant="h6" fontWeight="bold">
					{text}
				</Typography>
			</Button>
		);
	}

	const sortByOptions = (rooms, [param, desc]) => {
		rooms.sort((a, b) => {
			return a[param] < b[param] ? -1
				: a[param] > b[param] ? 1 : 0;
		});
		if (desc) rooms.reverse();
		return rooms;
	}

	const filteredRooms = useMemo(
		() => allRooms.filter((room) => {
			const roomName = room.shortname.toLowerCase();
			const buildingName = room.fullname.toLowerCase();
			return roomName.includes(searchTerm.toLowerCase()) || buildingName.includes(searchTerm.toLowerCase());
		}),
		[searchTerm]
	);

	const sortedSearchRooms = useMemo(
		() => sortByOptions([...filteredRooms], sortBy),
		[filteredRooms, sortBy]
	);

	React.useEffect(() => {
		setDisplayFrom(0);
	}, [searchTerm, sortBy]);

	return (
		<Box>
			<Box display="flex" alignItems="center" p={1} gap={1}>
				<TextField
					variant="outlined"
					label="Enter building name"
					onChange={(event) => setSearchTerm(event.target.value)}
					fullWidth
					autoComplete="off"
					slotProps={{
						input: { style: { borderRadius: "32px" } },
					}}
				/>
				<PopupState variant="popover" popupId="demo-popup-menu">
					{(popupState) => (
						<React.Fragment>
							<Button variant="contained" {...bindTrigger(popupState)} style={{ height: "56px", fontSize: "1.25rem" }}>
								⇅
							</Button>
							<Menu {...bindMenu(popupState)}>
								<MenuItem onClick={() => { popupState.close(); setSortBy(sortOptions.BUILDING) }}>building (ascending)</MenuItem>
								<MenuItem onClick={() => { popupState.close(); setSortBy(sortOptions.SEATS_DEC) }}>capacity (descending)</MenuItem>
							</Menu>
						</React.Fragment>
					)}
				</PopupState>
			</Box>

			<Box display="flex" gap={0} justifyContent="center">
				{changeDisplayButton(
					`<<`,
					() => setDisplayFrom(0)
				)}

				{changeDisplayButton(
					`<`,
					() => setDisplayFrom(
						displayFrom - DISPLAY_LIMIT > 0
							? displayFrom - DISPLAY_LIMIT
							: 0
					)
				)}

				<Box display="flex" alignItems="center">
					<Typography>
						{displayFrom + 1} - {Math.min(displayFrom + DISPLAY_LIMIT, sortedSearchRooms.length)} of {sortedSearchRooms.length}
					</Typography>
				</Box>

				{changeDisplayButton(
					`>`,
					() => setDisplayFrom(
						displayFrom + DISPLAY_LIMIT < sortedSearchRooms.length
							? displayFrom + DISPLAY_LIMIT
							: sortedSearchRooms.length - (sortedSearchRooms.length % DISPLAY_LIMIT)
					)
				)}

				{changeDisplayButton(
					`>>`,
					() => setDisplayFrom(
						Math.floor(sortedSearchRooms.length / DISPLAY_LIMIT) * DISPLAY_LIMIT
					)
				)}
			</Box>

			<Box padding={1} style={{ maxHeight: "69vh", overflowY: "scroll" }}>
				{sortedSearchRooms.slice(displayFrom, displayFrom + DISPLAY_LIMIT).map((room, index) => (
					<RoomInfoBox
						key={index}
						room={{
							fullname: room.fullname,
							shortname: room.shortname,
							number: room.number,
							address: room.address,
							seats: room.seats,
							lat: room.lat,
							lon: room.lon,
						}}
					/>
				))}
			</Box>

		</Box>
	);
}
