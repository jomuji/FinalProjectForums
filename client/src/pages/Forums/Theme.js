import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import CommentThread from '../../components/Comment/CommentThread';

const Theme = () => {
	const indicatorSize = 80;
	const { user, isAuthenticated } = useAuth0();
	const { _id } = useParams();
	const [themeById, setThemeById] = useState(null);
	const [comment, setComment] = useState('');
	const [disableButton, setDisableButton] = useState(false);
	const [commentInsertedId, setCommentInsertedId] = useState(null);

	useEffect(() => {}, [disableButton]);

	// fetch data getThemeById
	useEffect(() => {
		fetch(`/theme/${_id}`)
			.then((res) => res.json())
			.then((data) => {
				setThemeById(data.data);
			})
			.catch((error) => {
				console.log(error);
			});
		// DEPENDENCY: TRIGGERED WHEN _id PARAMS CHANGES
	}, [_id, commentInsertedId]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const email = user.email;

		console.log(email, 'EMAIL');
		const username = user.name;
		const lien = themeById[0].lien;
		const theme = themeById[0].theme;
		const themeId = themeById[0]._id;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				comment,
				_id,
				email,
				lien,
				username,
				theme,
				themeId,
			}),
		};

		fetch('/newcomment', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setCommentInsertedId(data.data.insertedId);
				setComment('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setComment(e.target.value);

		if (!isAuthenticated) {
			setDisableButton(true);
			window.alert(
				'Veuillez vous connecter avec des identifiants pour participer au forum.'
			);
		}
	};

	return (
		<>
			<ThemeSection>
				{!themeById ? (
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
						<Section>
							<ThemePost>{themeById[0].theme}</ThemePost>
							<UserName>
								<Bold>Par: </Bold>
								{themeById[0].username}
							</UserName>
						</Section>
					</ThemeWrapper>
				)}
			</ThemeSection>

			<CommentThread />

			<Form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<textarea
					placeholder='Que voulez-vous dire?'
					value={comment}
					onChange={(e) => {
						handleChange(e);
					}}
				></textarea>

				<ButtonWrapper>
					<Button type='submit' disabled={disableButton}>
						COMMENTER
					</Button>
				</ButtonWrapper>
			</Form>
		</>
	);
};

export default Theme;

const ThemeSection = styled.section`
	margin-top: 16em;
	margin-left: 1em;
	margin-right: 1em;
	margin-bottom: 1em;
`;

const ThemeWrapper = styled.div`
	max-width: 344px;
`;
const Section = styled.div`
	margin-bottom: 1.2em;
`;

const ThemePost = styled.p`
	font-weight: 700;
	font-size: 1.8em;
`;

const Bold = styled.span`
	font-weight: 700;
`;

const UserName = styled.p`
	margin-top: 0.8em;
	text-align: right;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	padding: 1em;
	width: 344px;
	margin-top: 1em;
	margin-left: 1em;
	textarea {
		margin-bottom: 1em;
		height: 100px;
		&:focus {
			outline: none !important;
			border: 1px solid #fada80;
			box-shadow: 0 0 10px #fada80;
		}
	}
`;

const Button = styled.button`
	border: none;
	background-color: var(--red);
	color: #fffaea;
	border-radius: 1em;
	padding: 0.8em 1.6em 0.8em;
	font-weight: 700;
	font-size: 0.8em;

	&:hover {
		color: ${(props) => (props.disabled ? '#FFFAEA' : '#FFFAEA')};
		background-color: ${(props) =>
			props.disabled ? 'var(--darkgrey)' : 'var(--green);'};
		border-radius: 15px;
		cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
	}
	/* 
	button:disabled {
		background-color: grey;
		cursor: no-drop;
	} */
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 30px;
`;
