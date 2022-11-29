import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

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
					<TitreSection>
						<TitrePage>FORUMS</TitrePage>
						{isAuthenticated ? <LogoutButton /> : <LoginButton />}
					</TitreSection>
					<ForumsSection>
						{modules.map((module) => {
							console.log(module, 'module');
							let titre = module.titre;
							titre = titre.toUpperCase();
							return (
								<NavLink key={module._id} to={`/forums/${module._id}`}>
									<ModuleSection>
										<FirstSection>
											<Id>{module._id}</Id> <div>FORUM</div>
										</FirstSection>

										<SecondSection>
											<Titre>{titre}</Titre>
											<Objectif>{module.objectif}</Objectif>
										</SecondSection>
									</ModuleSection>
								</NavLink>
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
const TitreSection = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const TitrePage = styled.h1`
	font-weight: 700;
`;

const ForumsSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1em;
	margin-top: 1.5em;
	margin-bottom: 1em;
`;
const ModuleSection = styled.button`
	display: flex;
	flex-direction: row;
	gap: 1em;
	align-items: flex-end;
	&:hover {
	}
`;
const FirstSection = styled.div`
	text-align: right;
`;

const Id = styled.p`
	font-size: 4em;
`;
const SecondSection = styled.section``;

const Objectif = styled.p`
	font-size: 1em;
	color: var(--lightgrey);
`;

const Titre = styled.p`
	font-weight: 700;
	font-size: 1.3em;
`;
