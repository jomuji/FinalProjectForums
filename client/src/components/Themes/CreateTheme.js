import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { device } from '../../components/MediaQueries';

/* import 'draft-js/dist/Draft.css'; */
/* import MyEditor from './Editor'; */

const CreateTheme = () => {
	const { user, isAuthenticated } = useAuth0();
	const indicatorSize = 80;
	const { lien } = useParams();
	const [themesByID, setThemesbyId] = useState(null);
	const [theme, setTheme] = useState('');
	const [disableButton, setDisableButton] = useState(false);

	const [themeInsertedId, setThemeInsertedId] = useState(null);
	/* 	const [isLoading, setIsLoading] = useState(false); */

	useEffect(() => {}, [disableButton]);

	/* useEffect(() => {
		fetch(`/themesbymodules/${lien}`)
			.then((res) => res.json())
			.then((data) => {
				setIsLoading(false);
				setThemesbyId(data.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [themeInsertedId, lien]);

	if (isLoading) {
		return <div>Loading..</div>;
	} */

	const loadThemesByModules = async () => {
		await fetch(`/themesbymodules/${lien}`)
			.then((response) => response.json())
			.then((response) => {
				setThemesbyId(response.result);
				console.log(response.result);
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		loadThemesByModules();
		// maybe add some updates to themeInsertedId and themesByID if needed
	}, [themeInsertedId, themesByID, lien]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const email = user.email;
		const username = user.name;

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				theme,
				email,
				lien,
				username,
			}),
		};

		fetch('/newtheme', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setTheme('');
				setThemeInsertedId(data.data.insertedId);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setTheme(e.target.value);

		if (!isAuthenticated) {
			setDisableButton(true);
			window.alert(
				'Veuillez vous connecter avec des identifiants pour participer au forum.'
			);
		}
	};
	/* return <MyEditor />; */

	return (
		/* 	<>
			{themesByID || themesByID === undefined ? (
				<Form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<textarea
						placeholder='Que voulez-vous dire?'
						value={theme}
						onChange={(e) => {
							handleChange(e);
						}}
					></textarea>

					<ButtonWrapper>
						<Button type='submit' disabled={disableButton}>
							PUBLIER
						</Button>
					</ButtonWrapper>
				</Form>
			) : (
				<div>isloading</div>
			)}
		</> */

		<>
			<Form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<textarea
					placeholder='Que voulez-vous dire?'
					value={theme}
					onChange={(e) => {
						handleChange(e);
					}}
				></textarea>

				<ButtonWrapper>
					<Button type='submit' disabled={disableButton}>
						PUBLIER
					</Button>
				</ButtonWrapper>
			</Form>
		</>
	);
};

export default CreateTheme;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	padding: 1em;
	width: 344px;
	margin-top: 1em;
	textarea {
		margin-bottom: 1em;
		height: 100px;
		&:focus {
			outline: none !important;
			border: 1px solid #fada80;
			box-shadow: 0 0 10px #fada80;
		}
	}

	@media ${device.laptop} {
		width: 885px;
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

const TextLimit = styled.p``;
