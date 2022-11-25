import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { IoMdLogOut } from 'react-icons/io';

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button onClick={() => logout({ returnTo: window.location.origin })}>
			DÉCONNEXION
			<IoMdLogOut />
		</Button>
	);
};

export default LogoutButton;

const Button = styled.button`
	font-size: 2em;
`;
