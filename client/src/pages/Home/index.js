import React from 'react';
import styled from 'styled-components';

const Home = () => {
	return (
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
				<Button>APERÇU DU PROGRAMME</Button>
			</RightSection>
		</Wrapper>
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
`;

const RightSection = styled.div``;

const Titre = styled.h1`
	width: 300px;
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

const Button = styled.button``;
