import { createContext, useState, useEffect } from 'react';

// titres used in URL links without french accents causing errors
export const LiensContext = createContext(null);

const LiensProvider = ({ children }) => {
	// SET UP STATE FOR ALL ITEMS
	const [liensTitres, setLiensTitres] = useState(null);

	// FETCH ALL ITEMS

	useEffect(() => {
		fetch('/moduleliens')
			.then((res) => res.json())
			.then((data) =>
				// When the data is received, update items
				setLiensTitres(data.data)
			);
	}, []);

	return (
		<LiensContext.Provider value={{ liensTitres, setLiensTitres }}>
			{children}
		</LiensContext.Provider>
	);
};

export default LiensProvider;
