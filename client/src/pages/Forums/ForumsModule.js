import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CreateTheme from '../../components/Themes/CreateTheme';
import { CircularProgress } from '@mui/material';

const ForumsModule = () => {
	const indicatorSize = 80;
	const { lien } = useParams();
	const [moduleById, setModuleById] = useState(null);

	// fetch data getModulesById '/modules/:_id'
	useEffect(() => {
		console.log(lien, 'lien');
		fetch(`/themesbymodules/${lien}`)
			.then((res) => res.json())
			.then(
				// When the data is received, update setModuleById
				(data) => {
					setModuleById(data.data);
					console.log(data, 'DATASETMODULE');
				}
			)
			.catch((error) => {
				console.log(error);
			});
		// DEPENDENCY: TRIGGERED WHEN CATEGORY PARAMS CHANGES
	}, [lien]);

	return (
		<>
			{!moduleById ? (
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
					<TitrePage>
						FORUM: <Titre>{moduleById[0].titre}</Titre>
					</TitrePage>

					<CreateTheme />
				</Wrapper>
			)}
		</>
	);
};

export default ForumsModule;

const Wrapper = styled.div`
	margin-top: 16em;
	margin-left: 1em;
	margin-right: 1em;
	margin-bottom: 1em;
`;

const TitrePage = styled.h1`
	font-weight: 700;
	margin-bottom: 1.5em;
`;

const Titre = styled.span`
	font-weight: 700;
	margin-bottom: 1.5em;
	text-decoration: underline;
`;
