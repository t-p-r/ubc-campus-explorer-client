import React from "react";
import "leaflet/dist/leaflet.css";
import { Box } from "@mui/material";
import Header from "./Header";
import SearchComponent from "./SearchBar";
import { SelectedRoomsProvider } from "./SelectedRoomContext";
import UBCMap from "./Map";
import SelectedRooms from "./SelectedRooms";
import { ThemeProvider } from "@mui/material/styles";
import defaultTheme from "./Theme.jsx";
import MapComponent from "./WalkingDistance.jsx"

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rooms: [],
		};
	}

	render() {
		return (
			<ThemeProvider theme={defaultTheme}>
				<SelectedRoomsProvider>
					<Box>
						<Header />
						<Box display="flex">
							<Box width="75%">
								<Box>
									<UBCMap />
								</Box>
								<Box display="flex" mt={0.5} marginLeft={0.5}>
									<Box padding={1} width="50%">
										<SelectedRooms />
									</Box>
									<Box padding={1} width="50%">
										<MapComponent />
									</Box>
								</Box>
							</Box>
							<Box flex={1} p={0}>
								<SearchComponent />
							</Box>
						</Box>
					</Box>
				</SelectedRoomsProvider>
			</ThemeProvider>
		);
	}
}
