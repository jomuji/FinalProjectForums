import React from 'react';
import styled from 'styled-components';
import Janette from '../../assets/janette.png';
import Codes from '../../assets/codes.png';
import Famille from '../../assets/collation.png';
import Mathieu from '../../assets/mathieu.png';

const Equipe = () => {
	return (
		<Wrapper>
			<div>Équipe</div>

			<img
				src={Janette}
				alt='Logo'
				onMouseOver={(e) => (e.currentTarget.src = Codes)}
				onMouseOut={(e) => (e.currentTarget.src = Janette)}
			/>

			<img
				src={Mathieu}
				alt='Logo'
				onMouseOver={(e) => (e.currentTarget.src = Famille)}
				onMouseOut={(e) => (e.currentTarget.src = Mathieu)}
			/>
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
