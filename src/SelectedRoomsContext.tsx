import { createContext, useState } from "react";
import { Room, ExtendedContext, Props } from "./types";

export const SelectedRoomsContext = createContext<ExtendedContext<Room>>({
	state: [],
	setter: () => { },
	adder: () => { },
});

export default function SelectedRoomsProvider({ children }: Props) {
	const SELECT_LIMIT = 5;
	const [selectedRooms, setSelectedRooms] = useState(new Array<Room>());

	const addSelectedRoom = (room: Room) => {
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
		<SelectedRoomsContext.Provider value={{ state: selectedRooms, setter: setSelectedRooms, adder: addSelectedRoom }}>
			{children}
		</SelectedRoomsContext.Provider>
	);
}