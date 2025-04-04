import React from "react";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import Header from "./Header";
import SearchComponent from "./SearchBar";
import { SelectedRoomsProvider } from "./SelectedRoomContext";
import UBCMap from "./Map";
import SelectedRooms from "./SelectedRooms";
import MapComponent from "./WalkingDistance";

const BACKEND_URL = "http://localhost:4321";

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
		};
	}

	componentDidMount() {
		const fetchAllQuery = {
			WHERE: {},
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

		const fetchRooms = async () => {
			try {
				const response = await fetch(BACKEND_URL + "/query", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(fetchAllQuery),
				});

				if (!response.ok) {
					alert("Warning: Server did not respond correctly.");
				}

				const data = await response.json();

				if (data && data.result) {
					this.setState({ rooms: data.result });
				}
			} catch (error) {
				console.error("Error fetching room count:", error);
			}
		};

		fetchRooms();
	}

	render() {
		return (
			<SelectedRoomsProvider>
				<Box>
					<Header />
					<Box display="flex">
						<Box width="75%">
							<Box>
								<UBCMap rooms={this.state.rooms} />
							</Box>
							<Box p={2}>
								<SelectedRooms />
							</Box>
							{/* <Box p={2}>
								<MapComponent />
							</Box> */}
						</Box>
						<Box flex={1} p={1} mt={4.3}>
							<SearchComponent />
						</Box>
					</Box>
				</Box>
			</SelectedRoomsProvider>
		);
	}
}

export default App;
