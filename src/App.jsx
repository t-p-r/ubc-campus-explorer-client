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
								<UBCMap />
							</Box>
							<Box flex={1} p={0}>
								<SearchComponent />
								<Box padding={1}>
									<SelectedRooms />
								</Box>
							</Box>
						</Box>
					</Box>
				</SelectedRoomsProvider>
			</ThemeProvider>
		);
	}
}
