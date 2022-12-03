import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';

const Home = () => {
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
	const isDesktopOrLaptop = useMediaQuery({
		query: '(min-width: 1224px)',
	});
	return (
		<>
			<Wrapper>
				<div>
					<h1>Device Test!</h1>
					{isDesktopOrLaptop && <p>You are a desktop or laptop</p>}
					{isTabletOrMobile && <p>You are a tablet or mobile phone</p>}
				</div>

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

  @media (min-width: 1366px) {

};

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

const Button = styled.button`
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

@media (min-width: 1024px) {


};


@media (min-width: 1366px) {

};

