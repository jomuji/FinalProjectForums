import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Couche from '../assets/couche.png';
import { Link } from 'react-router-dom';
import Attribution from '../assets/attribution.png';
import CreativeCommon from '../assets/common.png';
import NonCommercial from '../assets/noCommercialUse.png';

const Footer = () => {
	const [email, setEmail] = useState('');

	// reload state
	const handleSubmit = (e) => {
		e.preventDefault();

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email,
			}),
		};

		fetch('/emailListLaunch', requestOptions)
			.then((response) => response.json())
			.then((data) => {
				setEmail('');
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const handleChange = (e) => {
		setEmail(e.target.value);
	};

	return (
		<>
			<Wrapper>
				<FirstSection>
					<SectionDate>
						<Date>Lancement en juin 2023</Date>
						<Rejoignez>
							Rejoignez la liste de diffusion pour vous tenir au courant du
							lancement du programme:
						</Rejoignez>

						<Reussir>Réussir le démarrage d'une communauté de pratique</Reussir>
					</SectionDate>

					<Form
						onSubmit={(e) => {
							handleSubmit(e);
						}}
					>
						<input
							type='email'
							placeholder='Courriel'
							value={email}
							onChange={(e) => {
								handleChange(e);
							}}
						/>

						<ButtonWrapper>
							<Button type='submit'>REJOIGNEZ</Button>
						</ButtonWrapper>
					</Form>
				</FirstSection>
				<SecondSection>
					<img src={Couche} />
				</SecondSection>
			</Wrapper>
			<GreenSection>
				<LicenseSection>
					<LicenseLogo
						href='https://creativecommons.org/licenses/by-nc/4.0/deed.fr'
						target='_blank'
					>
						<img src={CreativeCommon} alt='cc' />
						<img src={Attribution} alt='attribution' />
						<img src={NonCommercial} alt='nc' />
					</LicenseLogo>

					<p>
						License:
						<a
							href='https://creativecommons.org/licenses/by-nc/4.0/deed.fr'
							target='_blank'
						>
							CC BY-NC 4.0
						</a>
					</p>

					<p>
						attribution:
						<Link to='/programme'>
							Réussir le démarrage d'une communauté
						</Link>{' '}
					</p>

					<p>
						par:
						<Link to='/equipe'> l'équipe d'Ailleurs conseil</Link>
					</p>
				</LicenseSection>
			</GreenSection>
		</>
	);
};

export default Footer;

const Wrapper = styled.section`
	position: relative;
	height: 420px;
	background-color: #4083bb;
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;

	img {
		position: absolute;
		z-index: 0;
		bottom: -30px;
		right: 0;
	}
`;

const FirstSection = styled.section`
	max-width: 344px;
`;
const SecondSection = styled.section``;

const SectionDate = styled.section`
	color: #fffaea;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 57.6px;
	padding-bottom: 2em;
	font-weight: 700;
`;

const Date = styled.div`
	font-size: 1.8em;
	z-index: 1000;
	position: absolute;
	top: 73.6px;
	left: 16px;
`;

const Rejoignez = styled.div`
	max-width: 300px;
	margin-top: 1em;
	z-index: 1000;
	position: absolute;
	top: 105.6px;
	left: 16px;
`;

const Reussir = styled.div`
	max-width: 300px;
	margin-top: 1em;
	font-style: italic;
	font-size: 1em;
	z-index: 1000;
	position: absolute;
	top: 177.6px;
	left: 16px;
	color: #fada80;
`;

const Form = styled.form`
	display: flex;
	flex-direction: row;
	gap: 1em;
	padding-top: 166px;
	padding-left: 16px;
	padding-right: 16px;
	padding-bottom: 2em;
	position: abolute;

	input {
		width: 150px;
		z-index: 1000;
		border: none;
		outline: none;
		/* -webkit-transition: 0.5s; */
		transition: 0.5s;
		&:focus {
			border: 3px solid var(--red);
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
	z-index: 1000;

	&:hover {
		background-color: var(--green);

		color: ${(props) => (props.disabled ? '#FFFAEA' : '#FFFAEA')};
		background-color: ${(props) =>
			props.disabled ? 'var(--darkgrey)' : 'var(--green);'};
		border-radius: 15px;
		cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
	}
`;

const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	gap: 30px;
`;

const GreenSection = styled.div`
	background-color: #53b675;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 2em;
	padding-bottom: 2em;
	z-index: 1000;
	position: relative;
	bottom: 0;
	right: 0;
`;

const LicenseSection = styled.div`
	img {
		width: 1.8em;
	}
`;

const LicenseLogo = styled.a`
	display: flex;
	flex-direction: row;
	gap: 0.8em;
`;
