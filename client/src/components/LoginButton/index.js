import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { IoMdLogIn } from 'react-icons/io';

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0();

	return <button onClick={() => loginWithRedirect()}>connexion</button>;
};

export default LoginButton;
