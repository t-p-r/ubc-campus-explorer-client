import { Typography, TextField, Button, Box } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RoomInfoBox from "./RoomInfoBox";
import React, { useMemo, useState, useEffect } from "react";

import allRooms from "./rooms.js";

const DISPLAY_LIMIT = 6;

const sortOptions = Object.freeze({
	BUILDING: ["name", false],
	SEATS_DEC: ["seats", true],
});

export default function SearchComponent() {
	const [displayFrom, setDisplayFrom] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState(sortOptions.SEATS_DEC);

	const changeDisplayButton = (text, func) => {
		return (
			<Button onClick={func} variant="text" color="primary" data-testid={`change-display-button-${text}`}>
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

	// very rudimentary
	const filteredRooms = useMemo(
		() => allRooms.filter((room) => {
			const roomName = room.name.toLowerCase();
			const buildingName = room.fullname.toLowerCase();
			return roomName.includes(searchTerm.toLowerCase()) || buildingName.includes(searchTerm.toLowerCase());
		}),
		[searchTerm]
	);

	const sortedSearchRooms = useMemo(
		() => sortByOptions([...filteredRooms], sortBy),
		[filteredRooms, sortBy]
	);

	// lesson: useEffect here will trigger visible re-render
	useEffect(
		() => setDisplayFrom(0),
		[searchTerm, sortBy]
	);

	return (
		<Box>
			<Box display="flex" alignItems="center" p={1} gap={1}>
				<TextField
					data-testid="search-bar"
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
							<Button
								data-testid="order-button"
								variant="contained" {...bindTrigger(popupState)}
								style={{ height: "56px", fontSize: "1.25rem" }}
							>
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

				<Box display="flex" alignItems="center" data-testid="room-index-box">
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

			<Box padding={1} style={{ maxHeight: "69vh", overflowY: "scroll" }} data-testid="room-info-boxes">
				{sortedSearchRooms.slice(displayFrom, displayFrom + DISPLAY_LIMIT).map((room, index) => (
					<RoomInfoBox
						index={index}
						room={room}
					/>
				))}
			</Box>

		</Box>
	);
}
