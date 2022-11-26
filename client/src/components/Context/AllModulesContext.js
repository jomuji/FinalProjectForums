import { createContext, useState, useEffect } from 'react';

export const AllModulesContext = createContext(null);

const AllModulesProvider = ({ children }) => {
	// SET UP STATE FOR ALL ITEMS
	const [modules, setModules] = useState(null);

	// FETCH ALL ITEMS

	useEffect(() => {
		fetch('/modules')
			.then((res) => res.json())
			.then((data) =>
				// When the data is received, update items
				setModules(data.data)
			);
	}, []);

	return (
		<AllModulesContext.Provider value={{ modules, setModules }}>
			{children}
		</AllModulesContext.Provider>
	);
};

export default AllModulesProvider;
