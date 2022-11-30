import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const ThemePost = () => {
	const indicatorSize = 80;
	const { lien } = useParams();
	const [themesByModule, setThemesByModule] = useState(null);

	// fetch data getModulesById '/modules/:_id'
	useEffect(() => {
		fetch(`/themesbymodules/${lien}`)
			.then((res) => res.json())
			.then(
				// When the data is received, update setModuleById
				(data) => {
					setThemesByModule(data.data);
				}
			)
			.catch((error) => {
				console.log(error);
			});
		// DEPENDENCY: TRIGGERED WHEN LIEN PARAMS CHANGES
	}, [lien]);
	return (
		<>
			{!themesByModule ? (
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
						<Titre>THEME POST</Titre>
					</TitrePage>
				</Wrapper>
			)}
		</>
	);
};

export default ThemePost;
const Wrapper = styled.div`
	margin: 1em;
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
