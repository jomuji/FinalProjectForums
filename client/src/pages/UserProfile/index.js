import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import LogoutButton from '../../components/LogoutButton';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';

const UserProfile = () => {
	const indicatorSize = 80;
	const { user, isAuthenticated, isLoading } = useAuth0();
	const [userThemes, setUserThemes] = useState(null);
	const email = user.email;

	useEffect(() => {
		fetch(`/userThemes/${email}`)
			.then((res) => res.json())
			.then((data) => {
				setUserThemes(data.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, []);

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<Wrapper>
				<TitreSection>
					<TitrePage>MON PROFIL</TitrePage>
					<LogoutButton />
				</TitreSection>

				<ProfileSection>
					<Titre>MES INFORMATIONS</Titre>
					<p>{user.name}</p>
					<p>{user.email}</p>
				</ProfileSection>

				<ThemeSection>
					<Titre>MES DISCUSSIONS</Titre>

					{!userThemes ? (
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
						<ThemeWrapper>
							{userThemes.map((theme) => (
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
						</ThemeWrapper>
					)}
				</ThemeSection>

				<CommentSection>
					<Titre>MES COMMENTAIRES</Titre>
				</CommentSection>
			</Wrapper>
		)
	);
};

export default UserProfile;

const Wrapper = styled.section`
	margin-top: 16em;
	margin-left: 1em;
	margin-right: 1em;
	margin-bottom: 1em;
	display: flex;
	flex-direction: column;
	gap: 2em;
`;

const TitreSection = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const TitrePage = styled.h1`
	font-weight: 700;
`;

const ProfileSection = styled.section``;

const CommentSection = styled.section``;

const ThemeSection = styled.section``;
const Titre = styled.p`
	font-weight: 700;
	margin-bottom: 1em;
`;

const ThemeWrapper = styled.div`
	max-width: 344px;
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
