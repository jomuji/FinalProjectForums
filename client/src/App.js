// node packages
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// components
import Home from './pages/Home';
import Programme from './pages/Programme/index';
import ProgrammeModule from './pages/Programme/ProgrammeModule';
import Forums from './pages/Forums/index';
import ForumsModule from './pages/Forums/ForumsModule';
import Equipe from './pages/Equipe';
import User from './pages/User';
import NavBar from './components/NavBar';
import GlobalStyles from './components/GlobalStyles';

const App = () => {
	return (
		<BrowserRouter>
			<GlobalStyles />
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/user' element={<User />} />
				<Route path='/programme' element={<Programme />} />
				<Route path='/programme/:modules' element={<ProgrammeModule />} />
				<Route path='/forums' element={<Forums />} />
				<Route path='/forums/:modules' element={<ForumsModule />} />
				<Route path='/equipe' element={<Equipe />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
