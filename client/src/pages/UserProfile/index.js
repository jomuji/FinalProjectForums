import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import LogoutButton from '../../components/LogoutButton';

const UserProfile = () => {
	const { user, isAuthenticated, isLoading } = useAuth0();

	if (isLoading) {
		return <div>Loading ...</div>;
	}

	return (
		isAuthenticated && (
			<Wrapper>
				<TitreSection>
					<TitrePage>PROFIL</TitrePage>
					<LogoutButton />
				</TitreSection>

				<ProfileSection>
					<Titre>Vos informations</Titre>
					<p>{user.name}</p>
					<p>{user.email}</p>
				</ProfileSection>

				<ThemeSection>
					<Titre>Vos discussions</Titre>
				</ThemeSection>

				<CommentSection>
					<Titre>Vos commentaires</Titre>
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

const ThemeSection = styled.section``;

const CommentSection = styled.section``;

const Titre = styled.p`
	font-weight: 700;
	margin-bottom: 1em;
`;
