import React from 'react';
import LogoutButton from '../../components/LogoutButton';
import UserProfile from '../../components/UserProfile';

const User = () => {
	return (
		<>
			<UserProfile />
			<LogoutButton />
			<div>USER PAGE</div>;
		</>
	);
};

export default User;
