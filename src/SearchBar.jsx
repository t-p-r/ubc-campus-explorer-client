import { Typography, TextField, Button, Box } from "@mui/material";
import RoomInfoBox from "./RoomInfoBox";
import React from "react";

import allRooms from "./rooms.jsx";

export default class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			searchRooms: [],
			displayLimit: 5,
			firstSearch: false,
		};
	}

	handleSearch = (keyword) => {
		if (!keyword) {
			this.setState({ searchRooms: allRooms, firstSearch: false });
			return;
		}

		this.setState({ firstSearch: true });

		const filteredRooms = allRooms.filter((room) => {
			const roomName = room.shortname.toLowerCase();
			const searchTerm = keyword.toLowerCase();
			return roomName.includes(searchTerm);
		});

		this.setState({ searchRooms: filteredRooms });
	};

	componentDidMount() {
		if (!this.firstSearch) this.handleSearch();
	}

	handleInputChange = (event) => {
		this.handleSearch(event.target.value);
	};

	render() {
		const { searchTerm, searchRooms, displayLimit } = this.state;

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
				</Box>
				<Box padding={1}>
					{searchRooms.slice(0, displayLimit).map((room, index) => (
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
						onClick={() => this.setState({ displayLimit: displayLimit === 5 ? 10 : 5 })}
					>
						first {displayLimit === 5 ? 10 : 5} |
					</Typography>
					<Typography
						variant="body1"
						component="a"
						style={{ cursor: "pointer", textDecoration: "none", color: "#004AAD" }}
						onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
						onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
						onClick={() => this.setState({ displayLimit: 25 })}
					>
						first 25 |
					</Typography>
					<Typography
						variant="body1"
						component="a"
						style={{ cursor: "pointer", textDecoration: "none", color: "#004AAD" }}
						onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
						onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
						onClick={() => this.setState({ displayLimit: searchRooms.length })}
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
