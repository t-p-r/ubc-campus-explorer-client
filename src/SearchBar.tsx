import { Typography, TextField, Button, Box } from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RoomInfoBox from "./RoomInfoBox";
import { useState, useEffect } from "react";

import { Room } from "./types";
import allRooms from "./rooms.js";

const DISPLAY_LIMIT = 6;

type SortOption = {
	[key: string]: boolean;
};

const sortOptions = Object.freeze({
	BUILDING: ["fullname", false],
	SEATS_DEC: ["seats", true],
});

export default function SearchComponent() {
	const [searchRooms, setSearchRooms] = useState(allRooms);
	const [displayFrom, setDisplayFrom] = useState(0);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortBy, setSortBy] = useState(sortOptions.SEATS_DEC);

	const changeDisplayButton = (text: string, func: () => React.Dispatch<React.SetStateAction<any>>) => {
		return (
			<Button onClick={func} variant="text" color="primary">
				<Typography variant="h6" fontWeight="bold">
					{text}
				</Typography>
			</Button>
		);
	}

	const sortByOptions = (rooms: Room[], param: keyof Room, desc: boolean) => {
		rooms.sort((a, b) => {
			return a[param] < b[param] ? -1
				: a[param] > b[param] ? 1 : 0;
		});
		if (desc) rooms.reverse();
		return rooms;
	}

	const sortSearchRooms = (param: keyof Room, desc: boolean) => {
		const sortedRooms = sortByOptions([...searchRooms], param, desc);
		setSearchRooms(sortedRooms);
	}

	const handleSearch = (keyword: string) => {
		if (!keyword) {
			setSearchRooms(allRooms);
			return;
		}

		const filteredRooms = allRooms.filter((room) => {
			const roomName = room.shortname.toLowerCase();
			const buildingName = room.fullname.toLowerCase();
			const searchTerm = keyword.toLowerCase();
			return roomName.includes(searchTerm) || buildingName.includes(searchTerm);
		});

		sortByOptions(filteredRooms, sortBy[0], sortBy[1]);
		setSearchRooms(filteredRooms);
		setDisplayFrom(0);
	};


	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	useEffect(() => {
		handleSearch(searchTerm);
	}, [searchTerm]);

	useEffect(() => {
		sortSearchRooms(sortBy[0] as keyof Room, sortBy[1]);
	}, [sortBy]);

	return (
		<Box>
			<Box display="flex" alignItems="center" p={1} gap={1}>
				<TextField
					variant="outlined"
					label="Enter building name"
					onChange={handleInputChange}
					fullWidth
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
						{displayFrom + 1} - {Math.min(displayFrom + DISPLAY_LIMIT, searchRooms.length)} of {searchRooms.length}
					</Typography>
				</Box>

				{changeDisplayButton(
					`>`,
					() => setDisplayFrom(
						displayFrom + DISPLAY_LIMIT < searchRooms.length
							? displayFrom + DISPLAY_LIMIT
							: searchRooms.length - (searchRooms.length % DISPLAY_LIMIT)
					)
				)}

				{changeDisplayButton(
					`>>`,
					() => setDisplayFrom(
						Math.floor(searchRooms.length / DISPLAY_LIMIT) * DISPLAY_LIMIT
					)
				)}
			</Box>

			<Box padding={1} style={{ maxHeight: "69vh", overflowY: "scroll" }}>
				{searchRooms.slice(displayFrom, displayFrom + DISPLAY_LIMIT).map((room, index) => (
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
