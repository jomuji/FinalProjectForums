import { useAuth0 } from '@auth0/auth0-react';
import { CircularProgress } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import LogoGoldPng from '../../assets/LogoGoldPng.png';
import LogoRedPng from '../../assets/LogoRedPng.png';
import { LiensContext } from '../../components/Context/LiensContext';
import { device } from '../../components/MediaQueries';

const NavBar = () => {
	const indicatorSize = 80;
	const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
	const navigate = useNavigate();
	const [show, setShow] = useState(true);
	const { liensTitres } = useContext(LiensContext);

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
					<img src={user.picture} alt='PhotoUsager' />
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
			{!liensTitres ? (
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
				<BeigeUnderWrapper>
					<NavWrapper style={{ display: { show } }}>
						<Logo>
							<Link to='/'>
								<img
									src={LogoGoldPng}
									alt='Logo'
									onMouseOver={(e) => (e.currentTarget.src = LogoRedPng)}
									onMouseOut={(e) => (e.currentTarget.src = LogoGoldPng)}
								/>
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
								<NavLink
									to='/'
									style={({ isActive }) => ({
										textDecoration: !isActive ? 'none' : 'underline',
										textDecorationThickness: !isActive ? 'none' : '2px',
									})}
								>
									<Page>accueil</Page>
								</NavLink>
								<NavLink
									to='/programme'
									style={({ isActive }) => ({
										textDecoration: !isActive ? 'none' : 'underline',
										textDecorationThickness: !isActive ? 'none' : '2px',
									})}
								>
									<Page>programme</Page>
								</NavLink>
								<NavLink
									to='/forums'
									style={({ isActive }) => ({
										textDecoration: !isActive ? 'none' : 'underline',
										textDecorationThickness: !isActive ? 'none' : '2px',
									})}
								>
									<Page>forums</Page>
								</NavLink>
								<NavLink
									to='/equipe'
									style={({ isActive }) => ({
										textDecoration: !isActive ? 'none' : 'underline',
										textDecorationThickness: !isActive ? 'none' : '2px',
									})}
								>
									<Page>équipe</Page>
								</NavLink>
							</Nav>
							<ModuleNav>
								{liensTitres.map((title) => {
									if (!title) {
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
										/>;
									} else {
										title = title.toUpperCase();
									}
									return (
										<NavLink
											key={title}
											to={`/programme/${title}`}
											style={({ isActive }) => ({
												fontWeight: !isActive ? '400' : '700',
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
				</BeigeUnderWrapper>
			)}
		</>
	);
};

export default NavBar;

const BeigeUnderWrapper = styled.div`
	background-color: #fffaea;
	position: fixed;
	top: 0;
	z-index: 1500;
	width: 100%;
	padding: 0;
	height: 234px;
	margin: 0;

	@media ${device.mobileS} {
		height: 234px;
	}

	@media ${device.mobileM} {
		height: 234px;
	}

	@media ${device.mobileL} {
		height: 234px;
	}

	// 20px de marge de chaque coté
	@media ${device.tablet} {
		height: 168px;
	}

	// 40px de marge de chaque coté
	@media ${device.laptop} {
		height: 120px;
	}

	// 60px de marge de chaque côté
	@media ${device.laptopL} {
		height: 120px;
	}

	// 120px de marge de chaque côté
	@media ${device.desktop} {
	} ;
`;

const NavWrapper = styled.div`
	padding: 1em;
	max-width: 100%;
	margin-bottom: 2em;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
	gap: 5.2em;
	position: fixed;
	z-index: 2000;
	top: 0;
	transition-timing-function: ease-in;
	transition: 0.5s;

	a {
		&:hover {
			color: var(--red);
		}

		&:focus {
			box-shadow: none;
			outline: none;
		}
	}

	@media ${device.mobileS} {
		max-width: 320px;
	}

	@media ${device.mobileM} {
		max-width: 375px;
	}

	@media ${device.mobileL} {
		max-width: 425px;
	}

	// 20px de marge de chaque coté
	@media ${device.tablet} {
		max-width: 728px;
	}

	// 10px de marge de chaque coté
	@media ${device.laptop} {
		max-width: 1024px;
		margin-left: 175px;
	}

	// 60px de marge de chaque côté
	@media ${device.laptopL} {
		max-width: 13204px;
	}

	// 120px de marge de chaque côté
	@media ${device.desktop} {
		max-width: 2320px;
	} ;
`;

const SecondSection = styled.section`
	display: block;
	/* 	margin-right: 3em; */
`;

const Logo = styled.div`
	display: flex;
	flex-direction: row;
	font-weight: 700;
	gap: 0.5em;
	margin-bottom: 1em;
	width: 170px;
	img {
		width: 3.125em;
	}

	@media ${device.mobileM} {
	}

	@media ${device.mobileL} {
	}

	// 20px de marge de chaque coté
	@media ${device.tablet} {
		width: 190px;
	}

	// 40px de marge de chaque coté
	@media ${device.laptop} {
		width: 225px;
	}

	// 60px de marge de chaque côté
	@media ${device.laptopL} {
	}

	// 120px de marge de chaque côté
	@media ${device.desktop} {
	} ;
`;

const TitreLogo = styled.p`
	line-height: 1;
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

const Page = styled.a`
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

const User = styled.a`
	display: flex;
	flex-direction: column;
	align-items: center;
	line-height: 0.5;
	align-items: left;
	cursor: pointer;
	img {
		width: 3.125em;
		border-radius: 50%;
		margin-bottom: 0.5em;
	}
`;

const UserIcon = styled.span`
	font-size: 3.125em;
`;
