import { createContext, useState } from "react";

export const SelectedRoomsContext = createContext([]);

export default function SelectedRoomsProvider({ children }) {
	const SELECT_LIMIT = 5;
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
		<SelectedRoomsContext.Provider value={{ selectedRooms, setSelectedRooms, addSelectedRoom }}>
			{children}
		</SelectedRoomsContext.Provider>
	);
}