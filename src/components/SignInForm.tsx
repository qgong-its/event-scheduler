import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import PopUpWindow from '@/components/PopUpWindow';
import { useNavigate } from 'react-router';

interface UserInStorage {
	token: string;
	id: number;
}

const SignInForm = () => {
	const { pending } = useFormStatus();
	const [popUpMsg, setPopUpMsg] = useState<string>('');
	const navigation = useNavigate();

	const handleSubmit = async (formData: FormData) => {
		const email = formData.get('email') as string;
		const password = formData.get('pass') as string;

		try {
			if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
				throw new Error('Enter correct E-Mail');
			if (!password || password.trim().length < 8)
				throw new Error('Password at least 8 chars long');

			const response = await fetch(
				'http://localhost:3001/api/auth/login',
				{
					body: JSON.stringify({
						email: email,
						password: password,
					}),
					headers: {
						'Content-Type': 'application/json',
					},
					method: 'POST',
				},
			);

			if (!response.ok) {
				if (response.status === 403) {
					throw new Error('Password or E-Mail is false');
				} else {
					throw new Error("Couldn't sign in. Try later.");
				}
			}

			const data = await response.json();

			console.log('data: ', data);

			const error: string | null = data.error;
			const userId: number = data.user.id;
			const token: string = data.token;

			if (!error) {
				localStorageInput(userId, token);
				setTimeout(() => {
					navigation(-1);
				}, 3000);
			} else {
				throw new Error(error);
			}
		} catch (error) {
			setPopUpMsg(error instanceof Error ? error.message : String(error));
		}
	};

	const localStorageInput = (userId: number, token: string): void => {
		const tokensString: string | null = localStorage.getItem('tokens');

		const currentArray: UserInStorage[] = tokensString
			? JSON.parse(tokensString)
			: [];

		const updatedArray = currentArray.some((elem) => elem.id === userId)
			? [...currentArray]
			: [...currentArray, { id: userId, token: token }];

		localStorage.setItem('tokens', JSON.stringify(updatedArray));
	};

	return (
		<>
			<PopUpWindow message={popUpMsg} />
			<form action={handleSubmit}>
				<label htmlFor="email">E-Mail</label>
				<input type="text" id="email" name="email" />
				<label htmlFor="pass">Pass</label>
				<input type="password" id="pass" name="pass" />
				<button
					type="submit"
					className="btn btn-dash"
					disabled={pending}
				>
					{pending ? 'Logging in...' : 'Login'}
				</button>
			</form>
		</>
	);
};

export default SignInForm;
