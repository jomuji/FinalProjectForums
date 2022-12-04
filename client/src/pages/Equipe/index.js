import React from 'react';
import styled from 'styled-components';
import Janette from '../../assets/janette.png';
import Codes from '../../assets/codes.png';
import Famille from '../../assets/collation.png';
import Mathieu from '../../assets/mathieu.png';
import { device } from '../../components/MediaQueries';
import Footer from '../../components/Footer';

const Equipe = () => {
	return (
		<>
			<Wrapper>
				<TitrePage>ÉQUIPE</TitrePage>
				<LesBios>
					<section>
						<img
							src={Janette}
							alt='Logo'
							onMouseOver={(e) => (e.currentTarget.src = Codes)}
							onMouseOut={(e) => (e.currentTarget.src = Janette)}
						/>

						<Intro>
							<Nom>Janette Mujica</Nom>
							<Titre>CODEUSE ET DESIGNER</Titre>
						</Intro>
						<Statement>
							Chez Ailleurs, je m’intéresse à mobiliser la connaissance vers
							l'action.
						</Statement>
						<Bio>
							Durant une douzaine d’année, j’ai optimisé la productivité de
							dirigeants en tant qu’adjointe exécutive. J’entreprends une
							réorientation de carrière visant à prioriser l’expérience
							utilisateur en adoptant une posture empathique et holistique.
							J’étudie l’innovation à HEC Montréal ainsi que le développement
							web à Concordia.
						</Bio>
						<Bio>
							Mon objectif est d’élaborer des services qui sont bons pour les
							utilisateurs, les organisations et la société fondés sur des
							processus de recherche et cocréation.
						</Bio>
					</section>

					<section>
						<img
							src={Mathieu}
							alt='Logo'
							onMouseOver={(e) => (e.currentTarget.src = Famille)}
							onMouseOut={(e) => (e.currentTarget.src = Mathieu)}
						/>
						<Intro>
							<Nom>Mathieu Bouchard</Nom>
							<Titre>CRÉATEUR DE CONTENU</Titre>
						</Intro>
						<Statement>
							Chez Ailleurs, je m’intéresse à la gouvernance et au financement
							de l'innovation sociale.
						</Statement>
						<Bio>
							Après des études en économie appliquée, j’ai travaillé huit ans
							comme analyste en investissements et conseiller stratégique pour
							des grandes caisses de retraite. J’ai ensuite quitté le milieu de
							l’investissement pour compléter un doctorat en management à HEC
							Montréal.
						</Bio>
						<Bio>
							Mes travaux de recherche portent sur l’entraide, la pair-aidance,
							l’apprentissage collectif et l’organisation par et pour les
							usagers dans les systèmes professionnels.
						</Bio>
					</section>
				</LesBios>
			</Wrapper>
			<Footer />
		</>
	);
};

export default Equipe;

const Wrapper = styled.div`
	margin-top: 16em;
	padding-left: 1em;
	padding-right: 1em;
	padding-bottom: 1em;
	@media ${device.laptop} {
		margin-top: 9em;
		margin-left: 200px;
		padding-left: 0px;
		padding-bottom: 3em;
	}
`;

const LesBios = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 2em;
	img {
		width: 150px;
	}

	section {
		display: flex;
		flex-direction: column;
		gap: 1em;
		width: 343px;
	}

	@media ${device.laptop} {
		section {
			width: 40%;
		}
	}
`;

const TitrePage = styled.h1`
	font-weight: 700;
	margin-bottom: 1.5em;
`;

const Intro = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5em;
`;

const Nom = styled.div`
	font-size: 1.6em;
	font-weight: 700;
`;

const Titre = styled.div`
	color: var(--red);
	font-size: 0.8em;
	font-weight: 700;
`;

const Statement = styled.div`
	font-size: 1.2em;
	font-style: italic;
	font-weight: 700;
`;

const Bio = styled.div``;
