// node packages
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';

// components
import App from './App';

// context import
import AllModulesProvider from './components/Context/AllModulesContext';
import LiensProvider from './components/Context/LiensContext';

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID } = process.env;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	/* 	<React.StrictMode> */
	<Auth0Provider
		domain={REACT_APP_AUTH0_DOMAIN}
		clientId={REACT_APP_AUTH0_CLIENT_ID}
		redirectUri={window.location.origin}
	>
		<LiensProvider>
			<AllModulesProvider>
				<App />
			</AllModulesProvider>
		</LiensProvider>
	</Auth0Provider>
	/* </React.StrictMode> */
);
