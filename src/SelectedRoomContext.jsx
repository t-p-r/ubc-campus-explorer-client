import { createContext, useState} from "react";

const SelectedRoomsContext = createContext({
	selectedRooms: [],
	setSelectedRooms: () => {},
});

export function SelectedRoomsProvider({ children }) {
	const [selectedRooms, setSelectedRooms] = useState([]);

	const addSelectedRoom = (room) => {
		if (selectedRooms.some(selectedRoom => selectedRoom.shortname === room.shortname && selectedRoom.number === room.number)) {
			alert("This room is already selected!");
			return;
		}
		if (selectedRooms.length === 5) {
			alert("You can only select up to 5 rooms!");
			return;
		}
		setSelectedRooms([...selectedRooms, room]);
	};

	return (
		<SelectedRoomsContext.Provider value={{ selectedRooms, addSelectedRoom, setSelectedRooms }}>
			{children}
		</SelectedRoomsContext.Provider>
	);
}

export default SelectedRoomsContext;
