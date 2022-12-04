import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { CommentSection } from './CommentSection';
//import { ThemeSection } from './ThemeSection';
import { device } from '../../components/MediaQueries';

const CommentThread = () => {
	const indicatorSize = 80;
	const { user, isAuthenticated, isLoading } = useAuth0();
	const { _id } = useParams();
	const [commentsById, setCommentsById] = useState(null);
	const [deletedThemeId, setDeletedThemeId] = useState(null);

	useEffect(() => {
		fetch(`/comments/${_id}`)
			.then((res) => res.json())
			.then(
				// When the data is received, update setModuleById
				(data) => {
					setCommentsById(data.data);
				}
			)
			.catch((error) => {
				console.log(error);
			});
		// DEPENDENCY: TRIGGERED WHEN LIEN PARAMS CHANGES
	}, [_id, deletedThemeId]);

	//onClick function to handle if a comment is removed from thread
	const handleDeleteClick = (e, theme, _id) => {
		e.preventDefault();

		const email = user.email;
		const username = user.name;

		console.log(theme, 'THEME IN HANDLE');
		console.log(_id, 'ID IN HANDLE');

		const requestOptions = {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				_id,
				username,
				email,
				theme,
			}),
		};

		fetch(`/deleteCommentById/${_id}`, requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setDeletedThemeId(data._id);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	//onClick function to handle UPDATING a theme
	//const handleUpdateClick = (e, _id, updatedTheme) => {
	//	e.preventDefault();

	//	const requestOptions = {
	//		method: 'PATCH',
	//		headers: { 'Content-Type': 'application/json' },
	//		body: JSON.stringify({ _id, theme: updatedTheme }),
	//	};

	//	fetch(`/updatetheme/${_id}`, requestOptions)
	///		.then((response) => response.json())
	//		.then((data) => {
	/* setTheme(''); */
	//		})
	//		.catch((error) => {
	//		console.log(error);
	//	});
	//};

	const WrapperSection = () => {
		if (isLoading) {
			console.log(isLoading, 'IS LOADING');
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
					{commentsById.map((comment) => (
						<Section>
							<Nav key={comment._id} to={`/forums/fil/${comment._id}`}>
								<ThemePost>{comment.comment}</ThemePost>
							</Nav>
							<UserName>
								<Bold>Par:</Bold>
								{comment.username}
							</UserName>
						</Section>
					))}
				</Wrapper>
			);
		} else {
			return (
				<Wrapper>
					{/* 					{commentsById.map((comment) => (
						<CommentSection
							key={comment._id}
							id={comment._id}
							theme={comment.theme}
							username={comment.username}
							lien={comment.lien}
							comment={comment.comment}
							handleUpdateClick={handleUpdateClick}
							handleDeleteClick={handleDeleteClick}
						/>
					))} */}

					<>
						{console.log(commentsById, 'commentsById')}

						{commentsById.map((comment) => (
							<Section>
								<Nav to={`/forums/fil/${comment.id}`}>
									<ThemePost>{comment.comment}</ThemePost>
								</Nav>

								<UserName>
									<Bold>Par: </Bold>
									{comment.username}
								</UserName>

								{user.name === comment.username && (
									<ButtonSection>
										<DeleteButton
											onClick={(e) =>
												handleDeleteClick(e, comment.theme, comment._id)
											}
										>
											EFFACER
										</DeleteButton>
									</ButtonSection>
								)}
							</Section>
						))}
					</>
				</Wrapper>
			);
		}
	};

	return (
		<>
			{commentsById === null && (
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
			)}

			{commentsById === undefined && <div></div>}

			{commentsById && WrapperSection()}
		</>
	);
};

export default CommentThread;

const Wrapper = styled.div`
	max-width: 344px;
	@media ${device.laptop} {
		margin-left: 500px;
	}
`;
const Section = styled.div`
	margin-bottom: 1.2em;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	padding: 1em;
	width: 344px;
	margin-top: 1em;
	margin-left: 1em;
	@media ${device.laptop} {
		width: 580px;
	}
`;

const Nav = styled(NavLink)`
	color: var(--red);
`;

const ThemePost = styled.p`
	font-weight: 700;
	font-size: 1em;
`;

const UserName = styled.p`
	margin-top: 0.8em;
	text-align: right;
`;

const Bold = styled.span`
	font-weight: 700;
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

const DeleteButton = styled.button`
	text-decoration: underline;
	background-color: var(--beige);
	&:hover {
		color: var(--red);
	}
`;
