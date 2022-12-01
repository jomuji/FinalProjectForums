import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ImSphere, ImGift } from 'react-icons/im';
import { FiClock } from 'react-icons/fi';

// components
import LoginButton from '../../components/LoginButton';
import LogoutButton from '../../components/LogoutButton';
import Footer from '../../components/Footer';

// context
import { AllModulesContext } from '../../components/Context/AllModulesContext';

const Programme = () => {
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
						<TitrePage>
							Réussir le démarrage d'une communauté de pratique
						</TitrePage>
						{/* 					{isAuthenticated ? <LogoutButton /> : <LoginButton />} */}
					</TitreSection>
					<Apropos>
						<Introduction>
							<p>
								<Bold>À PROPOS DE CE PROGRAMME</Bold>
							</p>
							<p>
								Il s'adresse aux<Bold> facilitatrices </Bold>et
								<Bold> facilitateurs </Bold>de communauté de pratique
							</p>
							<p>
								Il vous donnera une démarche structurée pour démarrer une
								<Bold> communauté de pratique</Bold>, qui sera
								<Bold> mobilisatrice </Bold>
								et<Bold> pérenne </Bold>
							</p>
						</Introduction>

						<Table>
							<tr>
								<td>
									<ImSphere />
								</td>
								<td>100% en ligne et asynchrone</td>
							</tr>
							<tr>
								<td>
									<FiClock />
								</td>
								<td>Env. 5hrs pour compléter</td>
							</tr>
							<tr>
								<td>
									<ImGift />
								</td>
								<td>Sans frais</td>
							</tr>
						</Table>
					</Apropos>
					<ForumsSection>
						{modules.map((module) => {
							{
								console.log(module, 'MODULE');
							}
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
								<NavLink key={module.lien} to={`/programme/${module.lien}`}>
									<ModuleSection>
										<FirstSection>
											<Id>{module._id}</Id> <Forum>MODULE</Forum>
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
											<Question>
												{module.questions.map((question) => (
													<li>{question}</li>
												))}
											</Question>
										</SecondSection>
									</ModuleSection>
								</NavLink>
							);
						})}
					</ForumsSection>
				</Wrapper>
			)}
			<Footer />
		</>
	);
};

export default Programme;

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

const Apropos = styled.section`
	margin-top: 2em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2em;
`;

const Introduction = styled.p`
	display: flex;
	flex-direction: column;
	gap: 1em;
	color: var(--lightgrey);
	margin-bottom: 1em;
	width: 343px;
`;

const Bold = styled.span`
	font-weight: 700;
`;

const Table = styled.section`
	color: #4083bb;
	font-weight: 700;
	width: 450px;

	tr {
		display: flex;
		flex-direction: row;
		gap: 1em;
		padding-bottom: 1em;
	}

	td {
	}
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
	font-size: 6em;
`;
const Forum = styled.div``;

const SecondSection = styled.section`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	gap: 0.5em;
	text-align: left;
`;

const Question = styled.ul`
	padding-left: 1em;
	color: var(--lightgrey);
	font-style: italic;
	list-style-type: disc;

	li {
	}
`;

const Objectif = styled.div`
	font-size: 1em;
	color: var(--lightgrey);
`;

const Titre = styled.div`
	font-weight: 700;
	font-size: 1.3em;
`;
