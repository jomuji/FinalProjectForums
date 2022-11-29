import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { IoMdLogOut } from 'react-icons/io';

const LogoutButton = () => {
	const { logout } = useAuth0();

	return (
		<Button onClick={() => logout({ returnTo: window.location.origin })}>
			{/* 			<Icon>
				<IoMdLogOut />
			</Icon> */}
			DÉCONNEXION
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
	cursor: pointer;
	text-align: center;
	border: none;
	background-color: var(--red);
	color: #fffaea;
	border-radius: 1em;
	padding: 0.8em 1.6em 0.8em;
	font-weight: 700;
	font-size: 0.8em;
	&:hover {
		background-color: var(--green);
	}

	/* 	span {
		font-size: 1.4em;
	} */
`;

const Icon = styled.span``;
