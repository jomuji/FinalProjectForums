import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { IoMdLogIn } from 'react-icons/io';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return (
		<Button onClick={() => loginWithRedirect()}>
			{/* 			<IoMdLogIn /> */}
			CONNEXION
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
`;
