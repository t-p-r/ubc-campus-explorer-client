import { Typography, TextField, Button, Box } from "@mui/material";
import RoomInfoBox from "./RoomInfoBox";
import React, { createContext, useContext, useState } from "react";

const BACKEND_URL = "http://localhost:4321";

export default class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: "",
			searchRooms: [],
			displayLimit: 5,
			firstSearch: false,
		};
	}

	handleSearch = async () => {
		this.setState({ firstSearch: true });

		const searchQuery = {
			WHERE: {
				IS: { rooms_shortname: `*${this.state.searchTerm.toLocaleUpperCase()}*` },
			},
			OPTIONS: {
				COLUMNS: [
					"rooms_name",
					"rooms_fullname",
					"rooms_shortname",
					"rooms_number",
					"rooms_address",
					"rooms_seats",
					"rooms_lat",
					"rooms_lon",
				],
				ORDER: "rooms_name",
			},
		};

		try {
			const response = await fetch(BACKEND_URL + "/query", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(searchQuery),
			});

			if (!response.ok) {
				alert(`Warning: ${response.status}.`);
			}

			const data = await response.json();
			const filteredRooms = data.result;

			this.setState({ searchRooms: filteredRooms });
		} catch (error) {
			console.error("Error fetching room count:", error);
		}
	};

	componentDidMount() {
		// instantiate rooms
		if (!this.firstSearch) this.handleSearch();
	}

	handleInputChange = (event) => {
		this.setState({ searchTerm: event.target.value });
	};

	render() {
		const { searchTerm, searchRooms, displayLimit, firstSearch } = this.state;

		return (
			<Box>
				<Box display="flex" gap={2} alignItems="center" p={1}>
					<TextField
						variant="outlined"
						label="Enter room name"
						value={searchTerm}
						onChange={this.handleInputChange}
						fullWidth
						slotProps={{
							input: { style: { borderRadius: "12px" } },
						}}
					/>
					<Button variant="contained" onClick={this.handleSearch}>
						Apply
					</Button>
				</Box>
				<Box padding={1}>
					{searchRooms.slice(0, displayLimit).map((room, index) => (
						<RoomInfoBox
							key={index}
							room={{
								fullname: room.rooms_fullname,
								shortname: room.rooms_shortname,
								number: room.rooms_number,
								address: room.rooms_address,
								seats: room.rooms_seats,
								lat: room.rooms_lat,
								lon: room.rooms_lon,
							}}
							selectedMode={false}
						/>
					))}
				</Box>
				<Box display="flex" gap={0.5} justifyContent="center" mt={-2}>
					<Typography variant="body1" component="a" color="#004AAD">
						show:
					</Typography>
					<Typography
						variant="body1"
						component="a"
						style={{ cursor: "pointer", textDecoration: "none", color: "#004AAD" }}
						onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
						onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
						onClick={() => setDisplayLimit(displayLimit === 5 ? 10 : 5)}
					>
						first {displayLimit === 5 ? 10 : 5} |
					</Typography>
					<Typography
						variant="body1"
						component="a"
						style={{ cursor: "pointer", textDecoration: "none", color: "#004AAD" }}
						onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
						onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
						onClick={() => setDisplayLimit(25)}
					>
						first 25 |
					</Typography>
					<Typography
						variant="body1"
						component="a"
						style={{ cursor: "pointer", textDecoration: "none", color: "#004AAD" }}
						onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
						onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
						onClick={() => setDisplayLimit(searchRooms.length)}
					>
						all {searchRooms.length} rooms
					</Typography>
				</Box>
			</Box>
		);
	}
}

// export default function SearchBar({ rooms }) {
// 	const [state, setState] = useState({
// 		rooms,
// 	});

// 	return (
// 		<SearchBarContext.Provider value={{ state, setState }}>
// 			<SearchBarObj rooms={rooms} />
// 		</SearchBarContext.Provider>
// 	);
// }
