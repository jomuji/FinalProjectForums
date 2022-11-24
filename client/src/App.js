// node packages
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './pages/Home';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Home />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
