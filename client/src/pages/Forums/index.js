import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

// components
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';
import UserProfile from '../../components/UserProfile';

const Home = () => {
	const { isAuthenticated } = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			// fetch backend to get user info
		}
	}, [isAuthenticated]);

	return (
		<div>
			<h1>Home</h1>
			{isAuthenticated ? <LogoutButton /> : <LoginButton />}
			<UserProfile />
		</div>
	);
};

export default Home;
