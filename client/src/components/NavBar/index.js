import React from 'react';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogoGoldPng from '../../assets/LogoGoldPng.png';
import LogoRedPng from '../../assets/LogoRedPng.png';
import { CircularProgress } from '@mui/material';
import { MdAccountCircle } from 'react-icons/md';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
	const [moduleTitles, setModuleTitles] = useState(null);
	const indicatorSize = 80;
	const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const navigate = useNavigate();
	const [show, setShow] = useState(true);

	useEffect(() => {
		fetch('/moduletitles')
			.then((res) => res.json())
			.then((data) =>
				// When the data is received, update moduleTitlesState
				setModuleTitles(data.data)
			)
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const controlNavbar = () => {
		if (window.scrollY > 100) {
			setShow(false);
		} else {
			setShow(true);
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', controlNavbar);
		return () => {
			window.removeEventListener('scroll', controlNavbar);
		};
	}, []);

	const userSection = () => {
		// if still loading, will display loading icon
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

			// if user is authenticated, it displays his name and links to signoff
		} else if (isAuthenticated) {
			let name = user.given_name;
			name = name.toUpperCase();
			return (
				<User onClick={() => navigate('/user')}>
					<UserPicture>
						<img src={user.picture} alt='userPic' />
					</UserPicture>
					<Connexion>{user.given_name}</Connexion>
					{/* <Connexion>{name}</Connexion> */}
				</User>
			);

			// if user is not authenticated, then is links to the authentication page
		} else {
			return (
				<User onClick={() => loginWithRedirect()}>
					<UserIcon>
						<MdAccountCircle />
					</UserIcon>
				</User>
			);
		}
	};

	return (
		<>
			{!moduleTitles ? (
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
				/* 			{show && ( */
				<NavWrapper style={{ display: { show } }}>
					<Logo>
						<Link to='/'>
							<img
								src={LogoGoldPng}
								alt='Logo'
								onMouseOver={(e) => (e.currentTarget.src = LogoRedPng)}
								onMouseOut={(e) => (e.currentTarget.src = LogoGoldPng)}
							/>{' '}
						</Link>
						<TitreLogo>
							Conseil en
							<br />
							apprentissage
							<br />
							collectif
						</TitreLogo>
					</Logo>

					<SecondSection>
						<Nav>
							<NavLink to='/'>
								<Page>accueil</Page>
							</NavLink>
							<NavLink to='/programme'>
								<Page>programme</Page>
							</NavLink>
							<NavLink to='/forums'>
								<Page>forums</Page>
							</NavLink>
							<NavLink to='/equipe'>
								<Page>équipe</Page>
							</NavLink>
						</Nav>
						<ModuleNav>
							{moduleTitles.map((title) => {
								title = title.toUpperCase();
								return (
									<NavLink
										key={title}
										to={`/programme/${title}`}
										style={(isActive) => ({
											textDecoration: !isActive ? 'none' : 'underline',
										})}
									>
										<div>{title}</div>
									</NavLink>
								);
							})}
						</ModuleNav>
					</SecondSection>
					{userSection()}
				</NavWrapper>
			)}
		</>
	);
};

export default NavBar;

const NavWrapper = styled.div`
	margin: 0px;
	padding: 1em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	/* 	position: fixed;
	top: 0; */
	transition-timing-function: ease-in;
	transition: 0.5s;
`;

const SecondSection = styled.section`
	display: block;
`;

const Logo = styled.div`
	display: flex;
	flex-direction: row;
	font-weight: 700;
	gap: 0.5em;
	margin-bottom: 1em;
	img {
		width: 50px;
	}
`;

const TitreLogo = styled.p`
	&:hover {
		color: var(--darkgrey);
	}
`;

const Nav = styled.nav`
	display: flex;
	flex-direction: row;
	gap: 1em;
	margin-bottom: 1em;
`;

const Page = styled.p`
	font-weight: 700;
	color: var(--darkgrey);
`;

const ModuleNav = styled.a`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	gap: 0.5em;
	font-size: 0.8em;
	color: var(--lightgrey);
	margin-bottom: 1em;
`;

const User = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	span {
		font-size: 0.6em;
	}
`;
const UserIcon = styled.div`
	font-size: 50px;
	line-height: 0.5;
	align-items: left;
	&:hover {
		color: var(--red);
	}
`;
const UserPicture = styled.div`
	img {
		width: 50px;
		border-radius: 50%;
	}
`;
const Connexion = styled.span``;
