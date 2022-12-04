import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { ThemeSection } from './ThemeSection';
import { device } from '../../components/MediaQueries';

const ThemeThread = () => {
	const indicatorSize = 80;
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { lien } = useParams();
	const [themesByModule, setThemesByModule] = useState(null);
	const [deletedThemeId, setDeletedThemeId] = useState(null);

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
	}, [lien, deletedThemeId]);

	//onClick function to handle if a theme is removed from thread
	const handleDeleteClick = (e, _id) => {
		e.preventDefault();

		const email = user.email;
		const username = user.name;

		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				_id,
				lien,
				username,
				email,
			}),
		};

		fetch(`/deletethemeById/${_id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setDeletedThemeId(data._id);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//onClick function to handle UPDATING a theme
	const handleUpdateClick = (e, _id, updatedTheme) => {
		e.preventDefault();

		const requestOptions = {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ _id, theme: updatedTheme }),
		};

		fetch(`/updatetheme/${_id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				/* setTheme(''); */
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const WrapperSection = () => {
		if (isLoading) {
			return (
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
			);
		} else if (!isAuthenticated) {
			console.log(isAuthenticated, 'IS AUTH');
			return (
				<Wrapper>
					{themesByModule.map((theme) => (
						<Section>
							<Nav key={theme._id} to={`/forums/fil/${theme._id}`}>
								<ThemePost>{theme.theme}</ThemePost>
							</Nav>
							<UserName>
								<Bold>Par: </Bold>
								{theme.username}
							</UserName>
						</Section>
					))}
				</Wrapper>
			);
		} else {
			return (
				<Wrapper>
					{themesByModule.map((theme) => (
						<ThemeSection
							key={theme._id}
							lien={theme.lien}
							id={theme._id}
							theme={theme.theme}
							username={theme.username}
							handleUpdateClick={handleUpdateClick}
							handleDeleteClick={handleDeleteClick}
						/>
					))}
				</Wrapper>
			);
		}
	};

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
				WrapperSection()
			)}
		</>
	);
};

export default ThemeThread;

const Wrapper = styled.div`
	max-width: 344px;

	@media ${device.laptop} {
		max-width: 885px;
	}
`;
const Section = styled.div`
	margin-bottom: 1.2em;
`;

const Nav = styled(NavLink)`
	color: var(--red);
`;

const ThemePost = styled.a`
	font-weight: 700;
	font-size: 1.2em;
	text-decoration: underline;
`;

const Bold = styled.span`
	font-weight: 700;
`;

const UserName = styled.p`
	margin-top: 0.8em;
	text-align: right;
`;
