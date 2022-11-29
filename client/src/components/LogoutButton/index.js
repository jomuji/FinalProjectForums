import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { IoMdLogOut } from 'react-icons/io';

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button onClick={() => logout({ returnTo: window.location.origin })}>
			<IoMdLogOut /> DÉCONNEXION
		</Button>
	);
};

export default LogoutButton;

const Button = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	font-size: 0.8em;
	gap: 0.8em;

	color: #fffaea;
	font-weight: 700;
	border: none;
	padding: 0px;
	cursor: pointer;
	border-radius: 80px;
	background-color: var(--red);
	text-align: center;
	padding: 0.8em;
`;
