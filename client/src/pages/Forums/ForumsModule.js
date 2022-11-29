import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import CreateTheme from '../../components/Themes/CreateTheme';

const ForumsModule = () => {
	const { _id } = useParams();
	const [moduleById, setModuleById] = useState(null);

	// fetch data getModulesById '/modules/:_id'
	useEffect(() => {
		fetch(`/modules/${_id}`)
			.then((res) => res.json())
			.then(
				// When the data is received, update setCateogryState
				(data) => console.log(data.data, 'DATA MODULE ID')
			)
			.catch((error) => {
				console.log(error);
			});
		// DEPENDENCY: TRIGGERED WHEN CATEGORY PARAMS CHANGES
	}, []);

	/* console.log(moduleById, 'ModuleById'); */

	return (
		<Wrapper>
			<TitrePage>FORUM</TitrePage>
			<CreateTheme />
		</Wrapper>
	);
};

export default ForumsModule;

const Wrapper = styled.div`
	margin-top: 16em;
	margin-left: 1em;
	margin-right: 1em;
	margin-bottom: 1em;
`;

const TitrePage = styled.h1`
	font-weight: 700;
	margin-bottom: 1.5em;
`;
