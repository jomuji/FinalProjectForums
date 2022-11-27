import React from 'react';
import styled from 'styled-components';
import Janette from '../../assets/janette.png';
import Codes from '../../assets/codes.png';
import Famille from '../../assets/collation.png';
import Mathieu from '../../assets/mathieu.png';

const Equipe = () => {
	return (
		<Wrapper>
			<h1>Équipe</h1>

			<section>
				<img
					src={Janette}
					alt='Logo'
					onMouseOver={(e) => (e.currentTarget.src = Codes)}
					onMouseOut={(e) => (e.currentTarget.src = Janette)}
				/>
				<p>Janette Mujica</p>
				<p>CODEUSE ET DESIGNER</p>
				<p>
					Chez Ailleurs, je m’intéresse à mobiliser la connaissance vers
					l'action.
				</p>
				<p>
					Durant une douzaine d’année, j’ai optimisé la productivité de
					dirigeants en tant qu’adjointe exécutive. J’entreprends une
					réorientation de carrière qui vise à prioriser l’expérience
					utilisateur. J’étudie l’innovation et l'entrepreneuriat à HEC Montréal
					ainsi que le développement web à Concordia.
				</p>

				<p>CODEUSE ET DESIGNER.</p>
			</section>

			<section>
				<img
					src={Mathieu}
					alt='Logo'
					onMouseOver={(e) => (e.currentTarget.src = Famille)}
					onMouseOut={(e) => (e.currentTarget.src = Mathieu)}
				/>

				<p></p>
			</section>
		</Wrapper>
	);
};

export default Equipe;

const Wrapper = styled.div`
	margin-top: 16em;
	padding-left: 1em;
	padding-right: 1em;
	padding-bottom: 1em;
	img {
		width: 150px;
	}
`;
