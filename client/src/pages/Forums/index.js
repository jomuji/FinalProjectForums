import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { device } from '../../components/MediaQueries';

// components
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';

// context
import { AllModulesContext } from '../../components/Context/AllModulesContext';

const Forums = () => {
	const indicatorSize = 80;
	const { modules } = useContext(AllModulesContext);
	const { isAuthenticated } = useAuth0();
	let titre = null;

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
							if (!module) {
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
								/>;
							} else {
								titre = module.titre;
								titre = titre.toUpperCase();
							}

							return (
								<NavLink key={module.lien} to={`/forums/${module.lien}`}>
									<ModuleSection>
										<FirstSection>
											<Id>{module._id}</Id> <Forum>FORUM</Forum>
										</FirstSection>

										<SecondSection>
											{!titre ? (
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
												<Titre>{titre}</Titre>
											)}

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

	@media ${device.laptop} {
		max-width: 1100px;
		margin-top: 10em;
		margin-bottom: 5em;
		margin-left: 180px;
	}
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

	@media ${device.laptop} {
		max-width: 700px;
		margin-bottom: 5em;
	}
`;
const ModuleSection = styled.button`
	display: flex;
	flex-direction: row;
	gap: 1em;
	align-items: flex-end;
	background-color: var(--beige);
	color: var(--darkgrey);
	&:hover {
		color: var(--red);
	}
`;
const FirstSection = styled.div`
	text-align: right;
`;

const Id = styled.div`
	font-size: 4em;

	@media ${device.laptop} {
		font-size: 5em;
	}
`;
const Forum = styled.div`
	@media ${device.laptop} {
		font-size: 1.2em;
	}
`;

const SecondSection = styled.section`
	text-align: left;
`;

const Objectif = styled.div`
	font-size: 1em;
	color: var(--lightgrey);
	@media ${device.laptop} {
		font-size: 1.2em;
	}
`;

const Titre = styled.div`
	font-weight: 700;
	font-size: 1.3em;

	@media ${device.laptop} {
		font-weight: 600;
		font-size: 3em;
	}
`;
