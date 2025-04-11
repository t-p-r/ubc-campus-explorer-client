import { Typography, TextField, Button, Box } from "@mui/material";
import RoomInfoBox from "./RoomInfoBox";
import React from "react";

import allRooms from "./rooms.jsx";

const DISPLAY_LIMIT = 6;

export default class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchRooms: [],
			displayFrom: 0,
			firstSearch: false,
		};
	}

	handleSearch = (keyword) => {
		if (!keyword) {
			this.setState({ searchRooms: allRooms, firstSearch: false });
			return;
		}

		const filteredRooms = allRooms.filter((room) => {
			const roomName = room.shortname.toLowerCase();
			const buildingName = room.fullname.toLowerCase();
			const searchTerm = keyword.toLowerCase();
			return roomName.includes(searchTerm) || buildingName.includes(searchTerm);
		});

		this.setState({ searchRooms: filteredRooms });
		this.setState({ displayFrom: 0 });
		this.setState({ firstSearch: true });
	};

	componentDidMount() {
		if (!this.firstSearch) this.handleSearch();
	}

	handleInputChange = (event) => {
		this.handleSearch(event.target.value);
	};

	changeDisplayButton = (text, func) => {
		return (
			<Button onClick={func} variant="text" color="primary">
				<Typography variant="h6" fontWeight="bold">
					{text}
				</Typography>
			</Button>
		);
	}

	render() {
		const { searchRooms, displayFrom } = this.state;

		return (
			<Box>
				<Box display="flex" alignItems="center" p={1} marginInlineEnd={1.8}>
					<TextField
						variant="outlined"
						label="Enter building name"
						onChange={this.handleInputChange}
						fullWidth
						slotProps={{
							input: { style: { borderRadius: "32px" } },
						}}
					/>
				</Box>

				<Box display="flex" gap={0.5} justifyContent="center">
					{this.changeDisplayButton(
						`<<`,
						() => this.setState({ displayFrom: 0 })
					)}

					{this.changeDisplayButton(
						`<`,
						() => this.setState({ displayFrom: Math.max(displayFrom - DISPLAY_LIMIT, 0) })
					)}

					<Box display="flex" alignItems="center">
						<Typography>
							{displayFrom + 1} - {Math.min(displayFrom + DISPLAY_LIMIT, searchRooms.length)} of {searchRooms.length}
						</Typography>
					</Box>

					{this.changeDisplayButton(
						`>`,
						() => this.setState({
							displayFrom: displayFrom + DISPLAY_LIMIT < searchRooms.length
								? displayFrom + DISPLAY_LIMIT
								: displayFrom
						})
					)}

					{this.changeDisplayButton(
						`>>`,
						() => this.setState({
							displayFrom: (searchRooms.length % DISPLAY_LIMIT) === 0
								? searchRooms.length - DISPLAY_LIMIT
								: searchRooms.length - (searchRooms.length % DISPLAY_LIMIT)
						})
					)}
				</Box>

				<Box padding={1}>
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
}