import { createContext, useContext, useState, useMemo } from "react";
import data from "../../stays.json";

const Context = createContext();

function getContext() {
	return useContext(Context);
}

function ContextProvider({ children }) {
	const [isOpen, setIsOpen] = useState(false);
	const [location, setLocation] = useState(false);
	const [guest, setGuest] = useState(false);
	const [locationSearch, setLocationSearch] = useState("Helsinki,Finland");
	const [childrenNumber, setChildrenNumber] = useState(0);
	const [adultNumber, setAdultNumber] = useState(0);
	const [hotels, setHotels] = useState([...data]);

	const dataProvider = useMemo(
		() => ({
			setChildrenNumber,
			setAdultNumber,
			adultNumber,
			childrenNumber,
			locationSearch,
			setLocationSearch,
			guest,
			setGuest,
			location,
			setLocation,
			isOpen,
			setIsOpen,
			hotels,
			setHotels,
		}),
		[
			hotels,
			setChildrenNumber,
			setAdultNumber,
			adultNumber,
			childrenNumber,
			locationSearch,
			setLocationSearch,
			guest,
			setGuest,
			location,
			setLocation,
			isOpen,
			setIsOpen,
			hotels,
			setHotels,
		]
	);

	return <Context.Provider value={dataProvider}>{children}</Context.Provider>;
}

export { ContextProvider, getContext };
