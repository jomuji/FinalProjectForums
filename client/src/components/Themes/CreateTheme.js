import React from 'react';
import 'draft-js/dist/Draft.css';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

/* import MyEditor from './Editor'; */

const CreateTheme = () => {
	const { user, isAuthenticated } = useAuth0();
	const indicatorSize = 80;
	const { lien } = useParams();
	const [themesByID, setThemesbyId] = useState(null);
	const [theme, setTheme] = useState('');
	const [disableButton, setDisableButton] = useState(false);
	const [themeInsertedId, setThemeInsertedId] = useState(null);

	useEffect(() => {}, [disableButton]);

	useEffect(() => {
		fetch(`/themesbymodules/${lien}`)
			.then((res) => res.json())
			.then((data) => {
				setThemesbyId(data.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, [lien, themeInsertedId]);

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
				setThemeInsertedId(data.data.insertedId);
				setTheme('');
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
		<>
			{themesByID || themesByID === undefined ? (
				<Form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<textarea
						placeholder='Créez un nouveau fil de discussion'
						value={theme}
						onChange={(e) => {
							handleChange(e);
						}}
					></textarea>

					<ButtonWrapper>
						<Button type='submit' disabled={disableButton}>
							CRÉER
						</Button>
					</ButtonWrapper>
				</Form>
			) : (
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
		</>
	);
};

export default CreateTheme;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
	border-radius: 15px;
	padding: 1em;
	width: 344px;
	margin-top: 1em;
	textarea {
		margin-bottom: 1em;
		height: 100px;
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
