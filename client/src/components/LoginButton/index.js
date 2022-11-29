import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { IoMdLogIn } from 'react-icons/io';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Button onClick={() => loginWithRedirect()}>
			<IoMdLogIn />
			connexion
		</Button>
	);
};

export default LoginButton;

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
