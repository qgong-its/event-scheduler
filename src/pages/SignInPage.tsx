import { useState } from 'react';

interface UserWithToken {
	token: string;
	user: {
		id: number;
		email: string;
	};
}

function localStorageInput(userId: number, token: string) {
	const tokensString: string | null = localStorage.getItem('tokens');

	const tokensArray: UserWithToken[] = tokensString
		? JSON.parse(tokensString)
		: [];

	const [tokensArrayState, setTokensArrayState] = useState(tokensArray);

	if (tokensArray && tokensArray.length !== 0) {
		const searchedEntry: UserWithToken | undefined = tokensArray.find(
			(tokenEntry: UserWithToken) => {
				return tokenEntry.user.id === userId;
			},
		);
	}
}

const handleSubmit = async (formData: FormData) => {
	const email = formData.get('email');
	const pass = formData.get('pass');
	try {
		const response = await fetch('http://localhost:3001/api/auth/login', {
			body: JSON.stringify({
				email: email,
				password: pass,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});
		const data = await response.json();

		console.log('data: ', data);

		const userId = data.user.id;
		const token = data.token;
		localStorageInput(userId, token);
	} catch (error) {
		console.log(error);
	}
};

const SignInPage = () => {
	return (
		<>
			<h1>Sign In Page (Login Page)</h1>
			<form action={handleSubmit}>
				<label htmlFor="email">E-Mail</label>
				<input type="text" id="email" name="email" />
				<label htmlFor="pass">Pass</label>
				<input type="text" id="pass" name="pass" />
				<button type="submit">Login</button>
			</form>
		</>
	);
};

export default SignInPage;
