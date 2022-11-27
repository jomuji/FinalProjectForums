import React, { useContext, NavLink } from 'react';
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
					<ForumsSection>
						{modules.map((module) => {
							console.log(module, 'module');
							let titre = module.titre;
							titre = titre.toUpperCase();
							return (
								<ModuleSection>
									{/* 	<NavLink key={module._id} to={`/forums/${module._id}`}> */}
									<FirstSection>
										<Id>{module._id}</Id> <div>FORUM</div>
									</FirstSection>
									{/* 	</NavLink> */}
									<SecondSection>
										<Titre>{titre}</Titre> <div>{module.objectif}</div>
									</SecondSection>
								</ModuleSection>
							);
						})}
					</ForumsSection>
				</Wrapper>
			)}
		</>
	);
};

export default Forums;

const Wrapper = styled.section`
	margin-top: 16em;
	padding-left: 1em;
	padding-right: 1em;
	padding-bottom: 1em;
`;
const ForumsSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1em;
`;
const ModuleSection = styled.section`
	display: flex;
	flex-direction: row;
	gap: 1em;
	align-items: flex-end;
`;
const FirstSection = styled.section`
	text-align: right;
`;

const Id = styled.p`
	font-size: 5em;
`;
const SecondSection = styled.section``;

const Titre = styled.p`
	font-weight: 700;
	font-size: 1.3em;
`;
