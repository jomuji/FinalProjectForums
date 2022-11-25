import React from 'react';
import styled from 'styled-components';

const Home = () => {
	return (
		<Wrapper>
			<Titre>
				Programme pour réussir le démarrage d'une communauté de pratique
			</Titre>

			<RightSection>
				<Introduction>
					<p>
						Ce programme s'adresse aux<Bold> facilitatrices </Bold>et
						<Bold> facilitateurs </Bold> de communauté de pratique
					</p>
					<p>
						Il vous donnera une démarche structurée pour démarrer une
						<Bold> communauté de pratique </Bold>, qui sera
						<Bold> mobilisatrice </Bold>
						et<Bold> pérenne </Bold>
					</p>
				</Introduction>
				<button>PROGRAMME</button>
			</RightSection>
		</Wrapper>
	);
};

export default Home;
const Wrapper = styled.section`
	padding-left: 1em;
	padding-right: 1em;
`;

const RightSection = styled.div``;

const Titre = styled.h1`
	color: var(--darkgrey);
	font-size: 2em;
`;

const Introduction = styled.p`
	color: var(--lightgrey);
`;

const Bold = styled.span`
	font-weight: 700;
`;
