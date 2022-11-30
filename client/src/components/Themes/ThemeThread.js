import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

const ThemeThread = () => {
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
					console.log(data);
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
					{themesByModule.map((theme) => (
						<ThemeSection>
							<Nav key={theme._id} to={`/forums/fil/${theme._id}`}>
								<Theme>{theme.theme}</Theme>
							</Nav>
							<UserName>
								<Bold>Par: </Bold>
								{theme.username}
							</UserName>

							<ButtonSection>
								<UpdateButton>METTRE À JOUR</UpdateButton>
								<DeleteButton>EFFACER</DeleteButton>
							</ButtonSection>
						</ThemeSection>
					))}
				</Wrapper>
			)}
		</>
	);
};

export default ThemeThread;
const Wrapper = styled.div`
	max-width: 344px;
`;
const ThemeSection = styled.div``;

const Nav = styled(NavLink)`
		color: var(--red);
	}
`;

const Theme = styled.a`
	font-weight: 700;
	font-size: 1.2em;
	text-decoration: underline;
`;

const Bold = styled.span`
	font-weight: 700;
`;

const UserName = styled.p`
	margin-top: 1em;
	text-align: right;
`;

const ButtonSection = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	font-size: 0.8em;
	gap: 1em;
	margin-top: 0.8em;
	margin-bottom: 0.8em;
	padding-bottom: 0.8em;
	border-bottom: 0.2em dotted #fada80;
`;

const UpdateButton = styled.a`
	text-decoration: underline;
`;

const DeleteButton = styled.a`
	text-decoration: underline;
`;
