import React from 'react';
import { useForm } from 'react-hook-form';

export default function EmailListForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data, event) => {
		console.log(data);
		console.log(event, 'event');
		console.log(errors);

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				data,
			}),
		};

		fetch('/emailListLaunch', requestOptions)
			.then((response) => response.json())
			.then((data) => {})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<input
				type='text'
				placeholder='Email'
				{...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
			/>

			<input type='submit' />
		</form>
	);
}
