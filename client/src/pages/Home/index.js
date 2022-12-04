import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import { device } from '../../components/MediaQueries';
import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<Wrapper>
				<Titre>Réussir le démarrage d'une communauté de pratique</Titre>

				<RightSection>
					<Introduction>
						<p>
							Ce programme s'adresse aux<Bold> facilitatrices </Bold>et
							<Bold> facilitateurs </Bold> de communauté de pratique
						</p>
						<p>
							Il vous donnera une démarche structurée pour démarrer une
							<Bold> communauté de pratique</Bold>, qui sera
							<Bold> mobilisatrice </Bold>
							et<Bold> pérenne </Bold>
						</p>
					</Introduction>

					<Button to='/programme'>APERÇU DU PROGRAMME</Button>
				</RightSection>
			</Wrapper>
			<Footer />
		</>
	);
};

export default Home;
const Wrapper = styled.section`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	padding-left: 1em;
	padding-right: 1em;
	gap: 1.5em;
	align-items: flex-start;
	margin-top: 16em;
	margin-bottom: 57.6px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;

	@media ${device.mobileS} {
		max-width: 320px;
	}

	@media ${device.mobileM} {
		max-width: 375px;
	}

	@media ${device.mobileL} {
		max-width: 425px;
	}

	// 20px de marge de chaque coté
	@media ${device.tablet} {
		max-width: 728px;
	}

	// 40px de marge de chaque coté
	@media ${device.laptop} {
		max-width: 1024px;
		margin-top: 10em;
		margin-bottom: 5em;
		margin-left: 180px;
	}

	// 60px de marge de chaque côté
	@media ${device.laptopL} {
		max-width: 13204px;
	}

	// 120px de marge de chaque côté
	@media ${device.desktop} {
		max-width: 2320px;
	} ;
`;

const RightSection = styled.div`
	@media ${device.laptop} {
		width: 50%;
	}
`;

const Titre = styled.h1`
	@media ${device.laptop} {
		font-size: 1.6em;
		width: 290px;
	}
`;

const Introduction = styled.p`
	display: flex;
	flex-direction: column;
	gap: 1em;
	color: var(--lightgrey);
	margin-bottom: 1em;
	@media ${device.laptop} {
		width: 575px;
		margin-bottom: 2em;
	}
`;

const Bold = styled.span`
	font-weight: 700;
`;

const Button = styled(Link)`
	border: none;
	background-color: var(--red);
	color: #fffaea;
	border-radius: 1em;
	padding: 0.8em 1.6em 0.8em;
	font-weight: 700;
	font-size: 0.8em;
	&:hover {
		background-color: var(--green);
		color: #fffaea;
	}
`;
