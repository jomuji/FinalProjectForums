import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CreateTheme from '../../components/Themes/CreateTheme';
import { CircularProgress } from '@mui/material';
import ThemeThread from '../../components/Themes/ThemeThread';

const ForumsModule = () => {
	const indicatorSize = 80;
	const { lien } = useParams();
	const [title, setTitle] = useState(null);

	// fetch data getModulesById '/modules/:_id'
	useEffect(() => {
		fetch(`/titles/${lien}`)
			.then((res) => res.json())
			.then(
				// When the data is received, update setModuleById
				(data) => {
					setTitle(data.data);
				}
			)
			.catch((error) => {
				console.log(error);
			});
		// DEPENDENCY: TRIGGERED WHEN LIEN PARAMS CHANGES
	}, [lien]);

	return (
		<>
			{!title ? (
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
				<>
					<Wrapper>
						<TitrePage>
							FORUM: <Titre>{title}</Titre>
						</TitrePage>
						<CreateTheme />
						<TitreFils>Fils de discussion</TitreFils>
						<ThemeThread />
					</Wrapper>
				</>
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
`;

const TitreFils = styled.h1`
	font-weight: 700;
	margin-top: 1em;
	margin-bottom: 1em;
`;

const Titre = styled.span`
	font-weight: 700;
	margin-bottom: 1.5em;
	text-decoration: underline;
`;
