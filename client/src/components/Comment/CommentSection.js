import React from 'react';
import styled from 'styled-components';
import { useAuth0 } from '@auth0/auth0-react';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

export const CommentSection = ({
	key,
	id,
	theme,
	username,
	comment,
	lien,
	handleUpdateClick,
	handleDeleteClick,
}) => {
	const { user, isAuthenticated } = useAuth0();
	const [isUpdating, setIsUpdating] = useState(false);
	const [disableButton, setDisableButton] = useState(false);
	const [updateTheme, setUpdateTheme] = useState(theme);

	useEffect(() => {}, [disableButton]);

	const handleChange = (e) => {
		setUpdateTheme(e.target.value);

		if (!isAuthenticated) {
			setDisableButton(true);
			window.alert(
				'Veuillez vous connecter avec des identifiants pour participer au forum.'
			);
		}
	};

	return (
		<Section>
			{isUpdating ? (
				<UpdatingSection>
					<textarea
						placeholder='Que voulez-vous dire?'
						value={updateTheme}
						onChange={(e) => {
							handleChange(e);
						}}
					></textarea>

					<ButtonSection>
						<CancelButton
							onClick={(e) => {
								setIsUpdating(!isUpdating);
							}}
						>
							ANNULER
						</CancelButton>
						<PublishButton
							onClick={(e) => {
								handleUpdateClick(e, id, updateTheme);
								setIsUpdating(!isUpdating);
							}}
						>
							PUBLIER
						</PublishButton>
					</ButtonSection>

					<UserName>
						<Bold>Par: </Bold>
						{username}
					</UserName>
				</UpdatingSection>
			) : (
				<>
					<Nav to={`/forums/fil/${id}`}>
						<ThemePost>{comment}</ThemePost>
					</Nav>

					<UserName>
						<Bold>Par: </Bold>
						{username}
					</UserName>

					{user.name === username && (
						<ButtonSection>
							{/* 			<UpdateButton
								onClick={(e) => {
									setIsUpdating(!isUpdating);
								}}
							>
								METTRE À JOUR
							</UpdateButton> */}
							<DeleteButton onClick={(e) => handleDeleteClick(e, id, theme)}>
								EFFACER
							</DeleteButton>
						</ButtonSection>
					)}
				</>
			)}
		</Section>
	);
};

const Section = styled.div`
	margin-bottom: 1.2em;
	border-bottom: 0.2em dotted #fada80;
`;

const UpdatingSection = styled.div`
	margin-bottom: 0.8em;
	textarea {
		width: 343px;
		height: 50px;

		&:focus {
			outline: none !important;
			border: 1px solid #fada80;
			box-shadow: 0 0 10px #fada80;
		}
	}
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

const ButtonSection = styled.section`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	font-size: 0.8em;
	gap: 1em;
	margin-top: 0.8em;
	margin-bottom: 0.8em;
`;

const UpdateButton = styled.button`
	text-decoration: underline;
	background-color: var(--beige);
	&:hover {
		color: var(--red);
	}
`;

const DeleteButton = styled.button`
	text-decoration: underline;
	background-color: var(--beige);
	&:hover {
		color: var(--red);
	}
`;

const CancelButton = styled.button`
	text-decoration: underline;
	background-color: var(--beige);
	&:hover {
		color: var(--red);
	}
`;

const PublishButton = styled.button`
	text-decoration: underline;
	background-color: var(--beige);
	&:hover {
		color: var(--red);
	}
`;
