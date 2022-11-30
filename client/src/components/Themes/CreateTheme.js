import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Editor, EditorState } from 'draft-js';

const CreateTheme = () => {
	/* const [reloadState, setReloadState] = useState(false); */
	const { user, isAuthenticated } = useAuth0();
	const indicatorSize = 80;
	const { lien } = useParams();
	const [themesByID, setThemesbyId] = useState(null);
	const [theme, setTheme] = useState('');
	const [disableButton, setDisableButton] = useState(true);
	const [colorStyling, setColorStyling] = useState('grey');
	const [editorState, setEditorState] = useState(() =>
		EditorState.createEmpty()
	);

	useEffect(() => {
		console.log(disableButton);
	}, [disableButton]);

	useEffect(() => {
		console.log('hello');
		fetch(`/themesbymodules/${lien}`)
			.then((res) => res.json())
			.then((data) => {
				setThemesbyId(data.data);
				console.log(data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}, []);
	// reload state
	const handleSubmit = (e) => {
		e.preventDefault();

		const email = user.email;
		/* const theme = themesByID.theme; */

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				theme,
				email,
				lien,
			}),
		};

		fetch('/newtheme', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				/* 	setReloadState(!reloadState); */
				setTheme('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setTheme(e.target.value);
		const textLengthremainder = 280 - e.target.value.length;

		if (!isAuthenticated) {
			setDisableButton(true);
			window.alert(
				'Veuillez vous connecter avec des identifiants pour participer au forum.'
			);
		} else if (textLengthremainder <= 0) {
			setColorStyling('#FB483B');
			setDisableButton(true);
		} else if (textLengthremainder <= 55) {
			setColorStyling('#FDA346');
			setDisableButton(false);
		} else {
			setColorStyling('grey');
			setDisableButton(false);
		}
	};

	return (
		<>
			{!themesByID ? (
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
				<Form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<textarea
						placeholder='Créez un nouveau thème de conversation'
						value={theme}
						onChange={(e) => {
							handleChange(e);
						}}
					></textarea>

					<Editor editorState={editorState} onChange={setEditorState} />

					<ButtonWrapper>
						<TextLimit style={{ color: colorStyling }}>
							{280 - theme.length}
						</TextLimit>

						<Button type='submit' disabled={disableButton}>
							CRÉER
						</Button>
					</ButtonWrapper>
				</Form>
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
