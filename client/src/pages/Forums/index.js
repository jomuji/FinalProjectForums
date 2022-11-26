import React, { useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

// components
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';

// context
import { AllModulesContext } from '../../components/Context/AllModulesContext';

const Forums = () => {
	const indicatorSize = 80;
	const { modules } = useContext(AllModulesContext);
	const { isAuthenticated } = useAuth0();

	console.log(modules, 'modules');

	return (
		<>
			{!modules ? (
				<CircularProgress
					size={indicatorSize}
					sx={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						marginTop: `${-indicatorSize / 2}px`,
						marginLeft: `${-indicatorSize / 2}px`,
						color: '#FADA80',
					}}
				/>
			) : (
				<Wrapper>
					<div>
						<h1>Forums</h1>
						{isAuthenticated ? <LogoutButton /> : <LoginButton />}
					</div>
					<section>
						{modules.map((module) => (
							<>
								<div>
									<div>{module._id}</div> <div>FORUM</div>
								</div>
								<div>
									<div>{module.titre}</div> <div>{module.objectif}</div>
								</div>
							</>
						))}
					</section>
				</Wrapper>
			)}
		</>
	);
};

export default Forums;

const Wrapper = styled.section`
	margin-top: 16em;
	padding-left: 1em;
`;
