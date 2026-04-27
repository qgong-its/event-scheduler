import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import PopUpWindow from '@/components/PopUpWindow';
import { useNavigate } from 'react-router';
import { z } from 'zod';

export interface UserInStorage {
	token: string;
	id: number;
}

const SignInSchema = z.object({
	email: z.string().email('Enter correct email'),
	password: z.string().min(8, 'Password at least 8 chars long'),
});

const SignInForm = () => {
	const { pending } = useFormStatus();

	const [popUpMsgs, setPopUpMsgs] = useState<string[]>([]);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const navigation = useNavigate();

	const handleSubmit = async (formData: FormData) => {
		try {
			const rawData = {
				email: formData.get('email'),
				password: formData.get('password'),
			};

			const result = SignInSchema.safeParse(rawData);

			if (!result.success) {
				const fieldErrors: Record<string, string> = {};
				result.error.issues.map((err) => {
					const field = err.path[0] as string;
					fieldErrors[field] = err.message;
					return `${field}: ${err.message}`;
				});

				setErrors(fieldErrors);
				return;
			}

			setErrors({});
			setPopUpMsgs([]);

			const { email, password } = result.data;

			const response = await fetch(
				'http://localhost:3001/api/auth/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ email: email, password: password }),
				},
			);

			if (!response.ok) {
				if (response.status === 403) {
					setPopUpMsgs(['Password or E-Mail is incorrect']);
					return;
				}
				setPopUpMsgs(["Couldn't sign in. Try later."]);
				return;
			}

			const data = await response.json();

			const error: string | null = data.error;
			const userId: number = data.user.id;
			const token: string = data.token;

			if (!error) {
				localStorageInput(userId, token);

				setPopUpMsgs(['Login successful']);

				setTimeout(() => {
					navigation(-1);
				}, 3000);
			} else {
				setPopUpMsgs([error]);
			}
		} catch (error) {
			setPopUpMsgs([
				error instanceof Error ? error.message : String(error),
			]);
		}
	};

	const localStorageInput = (userId: number, token: string): void => {
		const tokensString = localStorage.getItem('tokens');

		const currentArray: UserInStorage[] = tokensString
			? JSON.parse(tokensString)
			: [];

		const updatedArray = currentArray.some((elem) => elem.id === userId)
			? [...currentArray]
			: [...currentArray, { id: userId, token }];

		localStorage.setItem('tokens', JSON.stringify(updatedArray));
	};

	return (
		<>
			<form action={handleSubmit} className="align-start flex flex-col">
				<label htmlFor="email">E-Mail</label>
				<input type="text" id="email" name="email" />
				{errors.email && <p className="error">{errors.email}</p>}

				<label htmlFor="password">Password</label>
				<input type="password" id="password" name="password" />
				{errors.password && <p className="error">{errors.password}</p>}

				<button
					type="submit"
					className="btn btn-dash"
					disabled={pending}
				>
					{pending ? 'Logging in...' : 'Login'}
				</button>
			</form>
			<PopUpWindow messages={popUpMsgs} />
		</>
	);
};

export default SignInForm;
