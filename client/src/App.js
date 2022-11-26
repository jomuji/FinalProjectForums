// node packages
import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// components
import GlobalStyles from './components/GlobalStyles';
import NavBar from './components/NavBar';
import Equipe from './pages/Equipe';
import ForumsModule from './pages/Forums/ForumsModule';
import Forums from './pages/Forums/index';
import Home from './pages/Home';
import Programme from './pages/Programme/index';
import ProgrammeModule from './pages/Programme/ProgrammeModule';
import User from './pages/User';

const App = () => {
	/// USER IDENTIFICATION GET OR CREATE NEW

	const { isAuthenticated, user } = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			// fetch backend to get user info //
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(user),
			};

			fetch(`http://localhost:8000/user/${user.email}`, requestOptions)
				.then((response) => response.json())
				.then((data) => {
					console.log(data, 'DATA POST');
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}, [isAuthenticated]);

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
