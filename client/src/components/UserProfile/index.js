import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import LogoutButton from '../LogoutButton';

const UserProfile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<Wrapper>
				<div>
					<img src={user.picture} /* alt={user.name} */ />
					<p>{user.name}</p>
					<p>{user.email}</p>
				</div>

				<LogoutButton />
			</Wrapper>
		)
	);
};

export default UserProfile;

const Wrapper = styled.section`
	margin-top: 16em;
`;
