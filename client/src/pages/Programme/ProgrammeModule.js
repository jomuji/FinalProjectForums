import React from 'react';
import styled from 'styled-components';
import Footer from '../../components/Footer';
import { useContext } from 'react';
import { LiensContext } from '../../components/Context/LiensContext';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { device } from '../../components/MediaQueries';

const ProgrammeModule = () => {
	const { liensTitres } = useContext(LiensContext);
	const { lien } = useParams();

	console.log(lien, 'USEPARAMS');
	console.log(liensTitres, 'LIENSTITRES');
	return (
		<>
			<Wrapper>
				<TitrePage>MODULE</TitrePage>
				<p>contenu à venir</p>
				<TitrePage>FORUM</TitrePage>
				<LinkForum to={`/forums/${lien}`}>participez au forum</LinkForum>
			</Wrapper>
			<Footer />
		</>
	);
};

export default ProgrammeModule;

const Wrapper = styled.section`
	margin-top: 16em;
	margin-left: 200px;
	@media ${device.laptop} {
		margin-top: 8em;
		p {
			margin-bottom: 2em;
		}
	}
`;

const TitrePage = styled.h1`
	font-weight: 700;
	@media ${device.laptop} {
		margin-bottom: 0.8em;
	}
`;

const LinkForum = styled(Link)``;

/* const WrapperForum = styled.div`
	margin-top: 16em;
	margin-left: 1em;
	margin-right: 1em;
	margin-bottom: 1em;

	@media ${device.laptop} {
		margin-top: 9em;
		margin-left: 200px;
	}
`;

const TitrePage = styled.h1`
	font-weight: 700;
`;

const TitreFils = styled.h1`
	font-weight: 700;
	margin-top: 1em;
	margin-bottom: 1em;
	@media ${device.laptop} {
		margin-top: 1.5em;
	}
`;

const Titre = styled.span`
	font-weight: 700;
	margin-bottom: 1.5em;
	text-decoration: underline;
`;
 */
