import { createContext, useState} from "react";

const SelectedRoomsContext = createContext({
	selectedRooms: [],
	setSelectedRooms: () => {},
});

const SELECT_LIMIT = 5;

export function SelectedRoomsProvider({ children }) {
	const [selectedRooms, setSelectedRooms] = useState([]);

	const addSelectedRoom = (room) => {
		if (selectedRooms.some(selectedRoom => selectedRoom.shortname === room.shortname && selectedRoom.number === room.number)) {
			alert("This room is already selected!");
			return;
		}
		if (selectedRooms.length === SELECT_LIMIT) {
			alert(`You can only select up to ${SELECT_LIMIT} rooms!`);
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
